import React from 'react'
import { transformImage } from '../../lib/features'
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

function RenderAttachment({ file, url }) {
    switch (file) {
        case "image":
            return <img src={transformImage(url, 200)} alt="image" width={"200px"} height={"150px"} style={{
                objectFit: "contain",
            }} />
        case "video":
            return <video src={url} width={"200px"} height={200} controls />
        case "audio":
            return <audio src={url} controls />
        case "document":
            return <a href={url} target="_blank" download>Download</a>
        default:
            return <FileOpenIcon />
    }
}

export default RenderAttachment