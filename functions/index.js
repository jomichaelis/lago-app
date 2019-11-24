const functions = require('firebase-functions');
const {
    Storage
} = require('@google-cloud/storage');
const projectId = '1:792875159881:web:d0d50ecf5ecfca6b';
let gcs = new Storage({
    projectId
});
const os = require('os');
const path = require('path');

const sharp = require('sharp');
const fs = require('fs-extra');

const runtimeOpts = {
    memory: '1GB'
};

const uuidv4 = require('uuid/v4');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.generateThumbs = functions.runWith(runtimeOpts).storage.object().onFinalize(async object => {
    console.log("generateThumbs-Function started...")
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const file = path.parse(fileName).name;
    const fileExt = path.parse(fileName).ext;
    const bucketDir = path.dirname(filePath);

    const uuid = uuidv4();

    const workingDir = path.join(os.tmpdir(), 'thumbs');
    const tmpFilePath = path.join(workingDir, fileName);

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        console.log('file is already a thumb or no image');
        console.log('exiting function');
        return false;
    }

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
        destination: tmpFilePath
    });

    // 3. Resize the images and define an array of upload promises
    const sizes = [64, 256, 500, 1000, 2000];

    const uploadPromises = sizes.map(async size => {
        const thumbName = `${file}_thumb@${size}${fileExt}`;
        const thumbPath = path.join(workingDir, thumbName);

        // Resize source image
        await sharp(tmpFilePath)
            .resize({
                width: size
            })
            .toFile(thumbPath);

        // Upload to GCS
        const res = bucket.upload(thumbPath, {
            destination: path.join(bucketDir, thumbName),
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                }
            }
        });
        let storagePlaceTempArray = filePath.split('/');
        storagePlaceTempArray.splice(-1);
        let folders = storagePlaceTempArray.join('/');
        console.log(folders);
        const downloadURL = ("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(folders + '/' + thumbName) + "?alt=media&token=" + uuid);
        admin.firestore().collection("images").doc(fileName).set({[size]: downloadURL}, {merge: true});
        return res;
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises);

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.remove(workingDir).then(() => {
        return fs.remove(bucketDir);
    });
});
