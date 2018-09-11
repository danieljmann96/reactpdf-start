import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

export default class MyPDFViewer extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
        pdfdata: ""
    };

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    };
    render() {
        let { pageNumber, numPages } = this.state;
        axios.get("http://localhost:8000/read/5b97e1b4ff06900bc0f66935")
            .then(res => {
                let pdfdata = res.data;
                this.setState({pdfdata: pdfdata});
        })
            .catch(e => {console.log(e)});

        return (
            <div>
                <Document file={"data:application/pdf;base64," + this.state.pdfdata} onLoadSuccess={this.onDocumentLoad}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
                <button onClick={() => this.setState({pageNumber: pageNumber + 1})}>Click</button>
            </div>
        );
    }
}