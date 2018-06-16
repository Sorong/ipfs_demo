import React from "react";


class MainMedium extends React.Component {

    isVideo() {
        if(this.props.type === undefined) {
            return false;
        }
        return this.props.type.startsWith("video");
    }

    render() {
        if (this.isVideo()) {
            return (
                <div>
                    <video controls>
                        <source src={this.props.path}/>
                    </video>
                </div>
            )
        }
        return (

            <div>
                <img src={this.props.path} alt=""/>
            </div>

        )
    }

}

export default MainMedium;
