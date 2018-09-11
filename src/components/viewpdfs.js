import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

export default class MyPDFViewer extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
        pdfdata: "",
        search: "",
        results: {}
    };

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    };
    render() {
        let { pageNumber, numPages } = this.state;
        /*axios.get("http://localhost:8000/read/5b97e1b4ff06900bc0f66935")
            .then(res => {
                let pdfdata = res.data;
                this.setState({pdfdata: pdfdata});
        })
            .catch(e => {console.log(e)});
*/
        return (
            <div>
                {JSON.stringify(this.state.results)}
                <Document file={"data:application/pdf;base64," + this.state.pdfdata} onLoadSuccess={this.onDocumentLoad}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <input placeholder="Find pdf" id="search"></input>
                <button onClick={() => {
                    axios.get("http://localhost:8000/read/" + document.getElementById("search").value)
                        .then(res => {
                            let pdfdata = res.data;
                            this.setState({pdfdata: pdfdata});
                        })
                        .catch(e => {console.log(e)});
                }}>Search</button>

                <input placeholder="Find files matching name" id="otherSearch"></input>
                <button onClick={() => {
                    axios.get("http://localhost:8000/find/filename/" + document.getElementById("otherSearch").value)
                        .then(res => {
                            let result = res.data;
                            this.setState({results: result});
                        })
                        .catch(e => {console.log(e)});
                }}> Search other</button>

                <input placeholder="Delete file by id" id="deleteStuff"></input>
                <button onClick={() => {
                    axios.delete("http://localhost:8000/delete/" + document.getElementById("deleteStuff").value)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(e => {console.log(e)});
                }}> DELETE</button>

                <p>Page {pageNumber} of {numPages}</p>
                <button onClick={() => this.setState({pageNumber: pageNumber - 1})}>-</button>
                <button onClick={() => this.setState({pageNumber: pageNumber + 1})}>+</button>
            </div>
        );
    }
}