import React, { FunctionComponent } from 'react';
import ReactHLS from 'react-hls';

interface CamProps {
    url: string
}

const Cam: FunctionComponent<CamProps> = ({url}) => (
    <ReactHLS url={url} autoplay={true} width="100%" height="auto" />
);

export default Cam;
