import {message, notification} from "antd";
import {dealError} from "./dealResult";

export function dealMethod(contract,account,methodName,params){
    console.log(contract,account,methodName,params)
    const hide3 = message.loading('wait sign', 0);
    try{
        contract.methods[methodName](...params).estimateGas({
            from: account,
        }).then(gas => {
            contract.methods[methodName](...params).send({
                from: account,
                gas: parseInt(gas * 1.2),
            }).then(async res => {
                console.log(res)
                setTimeout(hide3, 1000);
                notification.success({
                    message: "Success",
                    description:
                        "",
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }).catch(e => {
                console.log(e)
                setTimeout(hide3, 1000);
            })
        }).catch(e => {
            console.log(e)
            message.warn("error:" + dealError(e))

            setTimeout(hide3, 1000);
        })
    }catch (e){
        message.warn("error:" + dealError(e))
        console.log(e)

        setTimeout(hide3, 1000);
    }
}
export function dealPayMethod(contract,account,methodName,params,value){
    console.log(contract,account,methodName,params)
    const hide3 = message.loading('wait sign', 0);
    try{
        contract.methods[methodName](...params).estimateGas({
            from: account,
            value
        }).then(gas => {
            contract.methods[methodName](...params).send({
                from: account,
                gas: parseInt(gas * 1.2),
                value
            }).then(async res => {
                console.log(res)
                setTimeout(hide3, 1000);
                notification.success({
                    message: "Success",
                    description:
                        "",
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }).catch(e => {
                console.log(e)
                setTimeout(hide3, 1000);
            })
        }).catch(e => {
            console.log(e)
            message.warn("error:" + e.message)

            setTimeout(hide3, 1000);
        })
    }catch (e){
        message.warn("error:" + dealError(e))
        console.log(e)

        setTimeout(hide3, 1000);
    }
}
export async function  viewMethod(contract,account,methodName,params){
    console.log(contract,account,methodName,params)
    try{
         const res =   await contract.methods[methodName](...params).call({
            from: account,
        }).catch(e => {
            console.log(e)
        })
        return res
    }catch (e){
        message.warn("error" + dealError(e))
        console.log(e)
    }
}
