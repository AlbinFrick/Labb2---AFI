import React, { Component } from 'react'

export class Form extends Component {
    state = {
        title: '',
        price: '',
        content: '',
        adPrice: '',
        subscriber: '',
        postedBy: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addToDatabase(this.state)
    }

    render() {
        return (
            <div>
                <div className="FormComp">
                    <h1>Form test</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            placeholder="Title"
                            className="input1"
                        />
                        <div id="input1Error" className="inputError">{this.state.titleErr}</div>
                        <input
                            type="textarea"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeholder="content"
                            className="input2"
                        />
                        <div id="input2Error" className="inputError" >{this.state.authorErr}</div>
                        <input
                            type="number"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            placeholder="price"
                            className="input2"
                        />
                        <input
                            type="number"
                            name="adPrice"
                            value={this.state.adPrice}
                            onChange={this.handleChange}
                            placeholder="adPrice"
                            className="input3"
                        />
                        <input
                            type="radio"
                            name="subscriber"
                            value={this.state.subscriber}
                            onChange={this.handleChange}
                            placeholder="subscriber"
                            className="input4"
                        />
                        <label htmlFor="subscriber">subscriber</label>
                        <button type="submit">Submit</button>
                    </form>
                    <div className="errorContainer">
                        <p>{this.state.ErrorMessage}</p>
                    </div>
                </div>
                <p>{this.state.title}</p>
                <p>{this.state.content}</p>
                <p>{this.state.adPrice}</p>
                <p>{this.state.subscriber}</p>
            </div>
        )
    }
}

export default Form
