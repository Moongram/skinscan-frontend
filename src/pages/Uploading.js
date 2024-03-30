import PatientFilter from '../components/PatientFilter';

const Uploading = () => {
    return (
    <div className='main'>
        <PatientFilter />
        <div className='upload-picture-wrapper'>
        <input type="file" accept="image/*" className='upload-picture'/>
        </div>
    </div>
    )
}

export default Uploading;