import { Badge } from '@material-ui/core';
import SimpleModal from '../Modal/SimpleModal';
import './SingleContent.css'
const SingleContent = (props) => {
    const { id, title, image, media_type, release_date, vote_average } = props;
    console.log(id+'id');
    return (
        <SimpleModal media_type={media_type} id={id}>
            <div className="box">
                <Badge badgeContent={vote_average} color={vote_average > 7 ? 'primary' : 'secondary'} />
                <img src={image} />
                <b className='title'>{title}</b>
                <span className='info'>
                    {media_type}
                    <span className='info'>{release_date.substring(0, 4)}</span>
                </span>
            </div>
        </SimpleModal>

    )
}
export default SingleContent;