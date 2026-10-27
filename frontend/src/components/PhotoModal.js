import React from "react";

const PhotoModal = (props) => {

    return (
        <>
            <button id="button" type="button" className="btn btn-light p-0 btn-lg rounded-5" style={{background:  "transparent", border: "0px"}} data-bs-toggle="modal" data-bs-target={"#photoModal"+props.number}>
                <img src={props.img} alt={props.description} style={{borderRadius: "3vw", width: "75%"}} ></img>
            </button>

            <div className="modal fade" id={"photoModal"+props.number} tabIndex="-1" role="dialog" aria-labelledby="photoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5 text-black" id="photoModalLabel">{props.description}</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <img src={props.img} style={{width: "100%"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhotoModal;