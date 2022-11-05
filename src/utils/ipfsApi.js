
/* eslint-disable */
import useSWR from "swr"
import jsonp from "jsonp";
import $ from  'jquery'
function upload(){

}

const config = {
    APIKey: '907ad3abd90dd849cb50',
    APISecret: '727b0fe39e90cd54d246358711e1b01a1d7af5c466bb8888b761546077328738',
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YjdkZDYzOC1mZDVkLTQ2NGMtYjY5Yi1kY2ViMTZhODBjOGEiLCJlbWFpbCI6Im1hbmdvYm94bGFic0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTA3YWQzYWJkOTBkZDg0OWNiNTAiLCJzY29wZWRLZXlTZWNyZXQiOiI3MjdiMGZlMzllOTBjZDU0ZDI0NjM1ODcxMWUxYjAxYTFkN2FmNWM0NjZiYjg4ODhiNzYxNTQ2MDc3MzI4NzM4IiwiaWF0IjoxNjY2MzIwOTQxfQ.fUXVgaQvansmo3wlpB2QSlmLFdorMKszlg2U5qS5QKE'
}



export async function getIpfs(strHash){
    if(strHash&&strHash.length>5&&typeof strHash == "string"){
        let result = await $.get(`https://cloudflare-ipfs.com/ipfs/${strHash}#x-ipfs-companion-no-redirect`,{})

        return result
    }else{
        return false
    }

}

export async function uploadFile(file){
    let data
    data.append('file', file);
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', `{"name": ${file.name}, "keyvalues": {"company": "Pinata"}}`);
    var posdData = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'Authorization': config.JWT,
        },
        data : data
    };
    let result = await axios(posdData)
    console.log(result)
    return result
}
export async function uploadJson(jsonData){
    console.log(jsonData)
    let result = await $.ajax({
        type:"post",
        url:'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            // "Authorization": config.JWT
            "pinata_api_key": config.APIKey,
            "pinata_secret_api_key": config.APISecret
        },
        data:jsonData
    })
    return result
}
export async  function getFromPinata(strHash) {
    if (strHash && strHash.length > 5 && typeof strHash == "string") {
        let result = await jsonp(`https://gateway.pinata.cloud/ipfs/${strHash}`, {})
        return result
    } else {
        return false
    }
}
