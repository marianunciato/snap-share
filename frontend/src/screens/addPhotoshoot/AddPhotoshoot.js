import '../../App.css';
import React from "react";
import Header from "../../components/header/Header.js";

const AddPhotoshoot = () => {
    return (
        <div className="bg-slate-50 h-screen w-screen">
            <Header/>
            <div className="new-photoshoot flex mt-96">
                <div>
                    <span className="color" style={{
                        color: "#000",
                        border: `1px solid #000`,
                        borderRadius: "20px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                    }}>
                            Cor
                    </span>
                </div>
                <div>
                    <span className="speed" style={{
                        color: "#000",
                        border: `1px solid #000`,
                        borderRadius: "20px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                    }}>
                        Velocidade
                    </span>
                </div>
                <div>
                    <span className="vehicle__type" style={{
                        color: "#000",
                        border: `1px solid #000`,
                        borderRadius: "20px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                    }}>
                        Tipo de véiculo
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AddPhotoshoot;