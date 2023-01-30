/* eslint-disable */
import useSWR from "swr"
import jsonp from "jsonp";
import $ from 'jquery'
import {message} from "antd";

function upload() {

}

const config = {
    APIKey: 'a9b45b1dc5f9ab173069',
    APISecret: 'f40cbf971e9e6901105ac4cb63a5399de39a7f2f6fc74af97ac4a77a32ba151a',
    JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxYmIzYTNkMi0xMDY1LTRhNWEtYjFlYS04MGI5MWZjNDJlM2EiLCJlbWFpbCI6ImJhcmFuaWlmMTI2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhOWI0NWIxZGM1ZjlhYjE3MzA2OSIsInNjb3BlZEtleVNlY3JldCI6ImY0MGNiZjk3MWU5ZTY5MDExMDVhYzRjYjYzYTUzOTlkZTM5YTdmMmY2ZmM3NGFmOTdhYzRhNzdhMzJiYTE1MWEiLCJpYXQiOjE2Njg4MjQ5NDh9.8FA87aDNA7J0auaASqtWIGGXgpdpj9867TvP_7WAa0A"
}


export async function getIpfs(strHash) {
    try{
        if (strHash && strHash.length > 5 && typeof strHash == "string") {
            let result = await $.get(`https://gateway.pinata.cloud/ipfs/${strHash}#x-ipfs-companion-no-redirect`, {}).catch(e => {
                console.log(e)
                message.error("get ipfs info err")
            })

            return result
        } else {
            return false
        }
    }catch (e){
        console.log(e)
    }

}

export async function uploadFile(file) {
    console.log(file)
    let data =  new FormData();
    data.append('file', file);
    const metadata = JSON.stringify({
        name: file.name,
    });
    data.append('pinataMetadata', metadata);
    const options = JSON.stringify({
        cidVersion: 0,
    })
    data.append('pinataOptions', options);
    var posdData = {
        type: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            // "Authorization": config.JWT
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxYmIzYTNkMi0xMDY1LTRhNWEtYjFlYS04MGI5MWZjNDJlM2EiLCJlbWFpbCI6ImJhcmFuaWlmMTI2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYzYyODYxYzE2MDAwZTVkMGNkMiIsInNjb3BlZEtleVNlY3JldCI6IjEzODAwNmEyMTY1YWMzMTgxZTI1NDQ3ZjdiNzM5M2RiM2JjNjJjYWI3NGY5ZDA0Y2I2OTViNDdhNzBlY2UxZjIiLCJpYXQiOjE2Njk4NzgxNjV9.htu4c2iXCyIjgUO0pBvE4EKwKOjeZNSs25FJHWsNstc",
        },
        maxBodyLength: "Infinity",
        contentType : false,
        processData : false,
        data: data
    };
    let result
    try{
        result = await $.ajax(posdData)
    }catch (e){
        console.log(e)
    }
    console.log(result)
    return result
}

export async function uploadJson(jsonData) {
    console.log(jsonData)
    let result = await $.ajax({
        type: "post",
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            // "Authorization": config.JWT
            "pinata_api_key": config.APIKey,
            "pinata_secret_api_key": config.APISecret
        },

        data: jsonData
    })
    return result
}

export async function getFromPinata(strHash) {
    if (strHash && strHash.length > 5 && typeof strHash == "string") {
        let result = await jsonp(`https://gateway.pinata.cloud/ipfs/${strHash}`, {})
        return result
    } else {
        return false
    }
}
