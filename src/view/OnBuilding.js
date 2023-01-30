import React, {} from 'react';
import styled from "styled-components";
import onBuildingImg from  "../imgs/fire_building.png"
const OnBuilding = () => {
    const OnBuilding = styled.div`

      .panel-box{
        .panel-container{
          padding: 0 10em 5em;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      }
      img{
        margin-top: 15%;
        ming-width: 350px;
        width: 26vw;
      }
      .title{
        margin-top: 2em;
        font-size: 2vw;
        font-family: Roboto-Bold, Roboto,sans-serif;  
        font-weight: bold;
        color: #FFFFFF;
        line-height: 3vw;
      }
    `


    return (
        <OnBuilding>
            <div className="panel-box">
                <div className="panel-container">
                    <img src={onBuildingImg} alt=""/>
                    <div className="title">
                        This module is on building!
                    </div>
                </div>
            </div>
        </OnBuilding>
    )
}
export default OnBuilding
