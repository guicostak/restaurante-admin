import React, {ChangeEvent, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {GetProp, message, Upload, UploadProps} from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};


const ImageUpload: React.FC<{
    onChange: (changeEvent: React.ChangeEvent<HTMLInputElement>) => void
}> = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleBeforeUpload = (file: File) => {
        const isJpgOrPng = file.type.startsWith('image/');
        if (!isJpgOrPng) {
            message.error('Você só pode enviar arquivos de imagem');
            return false;
        }
        return true;
    };


    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            props.onChange({
                target: {
                    name: 'image',
                    value: info.file.response.data.url
                }
            } as ChangeEvent<HTMLInputElement>);
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    }

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    return (
        <>
            <Upload name="image"
                    action="https://api.imgbb.com/1/upload?expiration=10&key=64170b4c16787170f413fdd85b9288fa"
                    headers={{
                        'Accept': '*/*',
                        'Origin': 'http://localhost:3000'
                    }}
                    method={'POST'}
                    listType={"picture-card"}
                    multiple={false}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleChange}
                    showUploadList={false}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
        </>
    );
};

export default ImageUpload;