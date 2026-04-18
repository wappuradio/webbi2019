import React, { useState } from 'react';
import ReactModal from 'react-modal'; 
import { sendFeedback } from '../../logic/Program';

ReactModal.setAppElement("#root");

interface FeedbackProps {
  title: string,
  isOpen: boolean,
  closeModal: () => void,
};

export const FeedbackModal: React.FC<FeedbackProps> = ({ title, isOpen, closeModal }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(-1);

    const feedbackChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setFeedback(e.currentTarget.value);
    };

    const ratingChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setRating(parseInt(e.currentTarget.value, 10));
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        sendFeedback(title, rating, feedback);
        closeModal();
    }

    return(
        <ReactModal
            isOpen={isOpen}
            requestClose="closeModal"
            contentLabel="Ohjelmapalaute"
            className="feedback_modal"
            overlayClassName="layout_container"
        >
            <h3 className="modalTitle">Ohjelmapalaute</h3>
            <button className="closeModal" onClick={() => closeModal()}>X</button>
            <br /><br />
            <form onSubmit={submitForm}>
                Arvosana<br />
                <span className="feedback_rating">
                    <input id="rating1" type="radio" name="rating" value="1" onChange={ratingChange} /><label htmlFor="rating1">1</label>
                    <input id="rating2" type="radio" name="rating" value="2" onChange={ratingChange} /><label htmlFor="rating2">2</label>
                    <input id="rating3" type="radio" name="rating" value="3" onChange={ratingChange} /><label htmlFor="rating3">3</label>
                    <input id="rating4" type="radio" name="rating" value="4" onChange={ratingChange} /><label htmlFor="rating4">4</label>
                    <input id="rating5" type="radio" name="rating" value="5" onChange={ratingChange} /><label htmlFor="rating5">5</label>
                </span>
                <br />
                <br />
                <label htmlFor="feedback_freeform">Vapaa sana</label><br />
                <input id="feedback_freeform" name="feedback" value={feedback} onChange={feedbackChange} /><br />
                <input type="submit" value="Lähetä" />
            </form>
        </ReactModal>
    );
}
