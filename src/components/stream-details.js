import React from 'react'
import { Button, OverlayTrigger, ButtonToolbar, Tooltip } from 'react-bootstrap'

export const StreamDetails = ({ streamData }) => {

    // const data = Object.values(streamData).map((data, index )=> (<input key={index} value={data}/>))
    const keys = Object.keys(streamData).map((keys) => (keys))
    console.log(keys)

    return (

        <form className="stream-form">
            <h5 className="card-title">Stream Name : {streamData.name}</h5>
            {keys.map((key, index) => {
                return (
                    <div className="form-group" key={index}>
                        <label key={`${index}-label`}>{key}</label>
                        {
                            <div>
                            <input className="form-control" id="stream-inputs" key={`${index}-input`} defaultValue={streamData[key]} />
                            <ButtonToolbar id="stream-tooltip">
                            {['right'].map(placement => (
                            <OverlayTrigger
                              key={placement}
                              placement={placement}
                              overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                <strong>Please enter the correct details for {key}</strong>.
                              </Tooltip>
                              }
                            >
                              <Button variant="success" className="ml-1">i</Button>
                            </OverlayTrigger>
                            ))}
                          </ButtonToolbar>
                          </div>
                        }
                    </div>
                )
            })}
            <Button as="input" type="submit" value="Save" />
        </form>
        
    )
};