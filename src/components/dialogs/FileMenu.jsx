import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';
import { AudioFile, Image, UploadFile, VideoFile } from '@mui/icons-material';
import toast from "react-hot-toast"
import { useSendAttachmentsMutation } from '../../redux/api/api';

const FileMenu = ({ anchorE1, chatId }) => {
    const { isFileMenu } = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const [sendAttachments] = useSendAttachmentsMutation();
    const imageRef = React.useRef(null);
    const audioRef = React.useRef(null);
    const videoRef = React.useRef(null);
    const fileRef = React.useRef(null);
    const closeFileMenu = () => {
        dispatch(setIsFileMenu(false))
    }
    const selectRef = (ref) => {
        ref.current.click();
    }
    const fileChangeHandler = async (e, key) => {
        console.log("Uploading files for chat:", chatId);

        const files = Array.from(e.target.files);

        if (files.length <= 0) return;

        if (files.length > 5) return toast.error(`You can only upload 5 ${key} at a time`);


        dispatch(setUploadingLoader(true));

        const toastId = toast.loading(`Uploading ${files.length} ${key}`);



        closeFileMenu();




        try {
            //fetching here
            const myForm = new FormData();
            myForm.append("chatId", chatId);
            files.forEach(file => myForm.append("files", file));
            const response = await sendAttachments(myForm);
            console.log("Attachment upload response:", response);


            if (response.data.success) {
                toast.success("Attachment Sent Successfully", { id: toastId });

            } else {
                toast.error(response.error.message, { id: toastId });
            }


        } catch (error) {
            console.log(error)
            toast.error(error, { id: toastId });
        } finally {
            dispatch(setUploadingLoader(false))
        }


    }
    return (
        <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu} sx={{
            width: "10rem"
        }}>
            <div style={{
                width: "10rem"
            }}>

                <MenuList>
                    <MenuItem onClick={() => selectRef(imageRef)}>
                        <Tooltip title="Audio">
                            <Image />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>
                            Image
                        </ListItemText>
                        <input type="file" multiple accept='image/png, image/jpeg, image/gif' style={{ display: "none" }} onChange={e => fileChangeHandler(e, "Images")} ref={imageRef} />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(audioRef)}>
                        <Tooltip>
                            <AudioFile />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>
                            Audio
                        </ListItemText>
                        <input type="file" multiple accept='audio/mpeg, audio/wav' style={{ display: "none" }} onChange={e => fileChangeHandler(e, "Audios")} ref={audioRef} />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(videoRef)}>
                        <Tooltip>
                            <VideoFile />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>
                            Video
                        </ListItemText>
                        <input type="file" multiple accept='video/mp4, video/webm, video/ogg' style={{ display: "none" }} onChange={e => fileChangeHandler(e, "Videos")} ref={videoRef} />
                    </MenuItem>
                    <MenuItem onClick={() => selectRef(fileRef)}>
                        <Tooltip>
                            <UploadFile />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.5rem" }}>
                            File
                        </ListItemText>
                        <input type="file" multiple accept='*' style={{ display: "none" }} onChange={e => fileChangeHandler(e, "Files")} ref={fileRef} />
                    </MenuItem>
                </MenuList>






            </div>
        </Menu>
    )
}

export default FileMenu