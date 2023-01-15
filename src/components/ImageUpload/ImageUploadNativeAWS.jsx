import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import styles from './ImageUpload.module.css'

import BasicButton from '../MaterialUI/BasicButton'

const S3_BUCKET ='junction-image-storage'
const REGION ='us-east-2'


AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = ({ fileUpload, handleChange }) => {

    const [progress , setProgress] = useState(0)

    const handleFileInput = (e) => {
        // setSelectedFile(e.target.files[0])
        handleChange(e)
    }

    const uploadFile = (file) => {
        console.log('Uploading file:', file)

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        }

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    useEffect(() => {
    fileUpload.current = uploadFile
    }, [])

    function click() {
        console.log('I was clicked')
    }

    return (
        <label for="file-upload" className={styles.customFileUpload}>
            <input className={styles.input} id="file-upload" type="file" onChange={handleFileInput}/>
            <BasicButton className={styles.customButton} text="Choose a file" isFormInvalid={true} handleClick={click}/>
        </label>
    )
}

export default UploadImageToS3WithNativeSdk