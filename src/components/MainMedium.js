import React from "react";


class MainMedium extends React.Component {

    isVideo() {
        if(this.props.medium === undefined) {
            return false;
        }
        return this.props.medium.type.startsWith("video");
    }

    render() {
        if (this.isVideo()) {
            return (
                <div>
                    <video controls>
                        <source src={this.props.medium.url}/>
                    </video>
                </div>
            )
        }
        return (

            <div>
                <img src={this.props.medium.url} alt=""/>
            </div>

        )
    }

}

export default MainMedium;
