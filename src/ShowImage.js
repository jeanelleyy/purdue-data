import React from "react";

class ShowImage extends React.Component {
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
    this.state = {
      currentImage: 0,
      seconds: 0
    };
  }

  switchImage() {
    if (this.state.currentImage == 0) {
      this.setState({
        currentImage: 1
      });
    } else {
      this.setState({
        currentImage: 0
      });
    }
    this.setState({seconds: this.state.seconds + 1});
    if(this.state.seconds > 7){
        clearInterval(this.timer);
    }
    return this.currentImage;
  }

  componentDidMount() {
        this.timer = setInterval(this.switchImage, 2000);     
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="image_style">
        <img
          src={this.props.images[this.state.currentImage]}
          alt="baggage images"
        />
      </div>
    );
  }
}
export default ShowImage;
