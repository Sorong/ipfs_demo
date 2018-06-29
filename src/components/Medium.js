import React from "react";


class Medium extends React.Component {

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
                        <source src={this.props.medium.content} style={{maxWidth : this.props.medium.width}}/>
                    </video>
                </div>
            )
        }
        return (

            <div>
                <img src={this.props.medium.content} alt="" style={{maxWidth : this.props.medium.width}}/>
            </div>

        )
    }

}

export default Medium;
