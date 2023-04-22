import {
 message
} from 'antd';
export function  handleCopy(text) {
    console.log(text)
    const clipboardObj = navigator.clipboard
    clipboardObj.writeText(text)
    clipboardObj.readText().then(res=>{
        message.success("Copy address success: "+res)
    })
}
