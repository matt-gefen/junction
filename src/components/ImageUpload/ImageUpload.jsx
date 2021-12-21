import React , { useState } from 'react'
import { uploadFile } from 'react-s3'


const S3_BUCKET ='junction-image-storage'
const REGION ='US East (Ohio) us-east-2'
const ACCESS_KEY = 'AKIAWRUHZSTAKJ52O3XP' //process.env.AWS_ACCESS_KEY
const SECRET_ACCESS_KEY = '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' //process.env.AWS_SECRET_ACCESS_KEY

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = ({ name, setupConfig, handleChange }) => {

    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
        handleChange(e)
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    const addConfig = (config) => {
      setupConfig(config)
      console.log('set config')
    }

    addConfig(config)

    return <div>
        <div>React S3 File Upload</div>
        <input 
          type="file"
          name={name}
          onChange={handleFileInput}
        />
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3