import React, { useState, FunctionComponent, Component } from 'react';
import ReactModal from 'react-modal'; 
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazyload';
import { submitFeedback } from '../../logic/Program';

const Hypher = require('hypher');
const fiPatterns = require('hyphenation.fi');
const hypher = new Hypher(fiPatterns);
const ReactMarkdown = require('react-markdown');

ReactModal.setAppElement("#root");

interface FeedbackProps {
  title: string,
  isOpen: boolean,
  closeModal: () => void
}
interface FeedbackState {
  rating: string,
  feedback: string,
}

export class FeedbackModal extends Component<FeedbackProps, FeedbackState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            feedback: "",
            rating: ""
        }
    }
    feedbackChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ feedback: e.currentTarget.value })
    };
    ratingChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ rating: e.currentTarget.value })
    };
    render() {
      return(
          <ReactModal
            isOpen={this.props.isOpen}
            requestClose="closeModal"
            contentLabel="Ohjelmapalaute"
            className="feedback_modal"
            overlayClassName="layout_container"
           >
        <h3 className="modalTitle">Ohjelmapalaute</h3>
        <button className="closeModal" onClick={(event) => this.props.closeModal()}>X</button>
        <br /><br />
        <form onSubmit={(event) => {submitFeedback(event); this.props.closeModal()}}>
            <input type="hidden" name="show" value={this.props.title} />
            Arvosana<br />
            <span className="feedback_rating">
                <input id="rating1" type="radio" name="rating" value="1" onChange={this.ratingChange} /><label htmlFor="rating1">1</label>
                <input id="rating2" type="radio" name="rating" value="2" onChange={this.ratingChange} /><label htmlFor="rating2">2</label>
                <input id="rating3" type="radio" name="rating" value="3" onChange={this.ratingChange} /><label htmlFor="rating3">3</label>
                <input id="rating4" type="radio" name="rating" value="4" onChange={this.ratingChange} /><label htmlFor="rating4">4</label>
                <input id="rating5" type="radio" name="rating" value="5" onChange={this.ratingChange} /><label htmlFor="rating5">5</label>
            </span>
            <br />
            <br />
            <label htmlFor="feedback_freeform">Vapaa sana</label><br />
            <input id="feedback_freeform" name="feedback" value={this.state.feedback} onChange={this.feedbackChange} /><br />
            <input type="submit" value="Lähetä" />
        </form>
        </ReactModal>
      ); 
    }
}
