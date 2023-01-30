import {message, notification} from "antd";
import {dealError} from "./dealResult";

export async function dealMethod(contract,account,methodName,params){
    const hide3 = message.loading('wait sign', 0);
    try{
        await contract.methods[methodName](...params).estimateGas({
            from: account,
        }).then(async gas => {
            await contract.methods[methodName](...params).send({
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
            message.warn( dealError(e))

            setTimeout(hide3, 1000);
        })
    }catch (e){
        message.warn( dealError(e))
        console.log(e)
        setTimeout(hide3, 1000);
    }
}
export async function  dealPayMethod(contract,account,methodName,params,value){
    const hide3 = message.loading('wait sign', 0);
    try{
        await contract.methods[methodName](...params).estimateGas({
            from: account,
            value
        }).then(async gas => {
            await contract.methods[methodName](...params).send({
                from: account,
                gas: parseInt(gas * 1.2),
                value
            }).then(async res => {
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
                message.warn(dealError(e))
                setTimeout(hide3, 1000);
            })
        }).catch(e => {
            console.log(e)
            message.warn( dealError(e))
            setTimeout(hide3, 1000);
        })
    }catch (e){
        message.warn( dealError(e))
        console.log(e)

        setTimeout(hide3, 1000);
    }
}
export async function  viewMethod(contract,account,methodName,params){
    try{
         const res =   await contract.methods[methodName](...params).call({
            from: account,
        }).catch(e => {
            console.log(e)
             message.warn(dealError(e))
        })
        return res
    }catch (e){
        message.warn(dealError(e))
        console.log(e)
    }
}
