import React, { useState } from 'react';
import InputField from '../../global/customComponents/InputField';
import PrimaryButton from '../../global/customComponents/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import useUsersApi from '../../global/hooks/useUsersApi';
import { addUser, usersSelector } from '../../redux/slices/userSlice';



const Form = () => {

    const dispatch = useDispatch();
    const registeredUser = useSelector(usersSelector);
    const { users } = useUsersApi('/users');
    const { updateUser } = useUsersApi('');
    const [editable, setEditable] = useState(false);
    const [editBtn, setEditBtn] = useState(false);

    const toggleEditable = () => {
        setEditable(!editable);
    }

    const [formData, setFormData] = useState({
        id: registeredUser?.id,
        firstName: registeredUser?.firstName,
        password: registeredUser?.password,
        email: registeredUser?.email,
        streetAddress: registeredUser?.streetAddress,
        city: registeredUser?.city,
        phoneNumber: registeredUser?.phoneNumber,
    })

    const handleChange = (event) => {
        setEditBtn(true)
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const saveChanges = async () => {
        dispatch(addUser(formData))
        updateUser(`/users/update-user/${formData?.id}`, formData)
        setEditBtn(false);
        setEditable(false);
    }

    return (
        <div className='profile-form'>
            <div className='d-flex head'>
                <h5>Edit Your Profile</h5>
                <div className='btn'>
                    {editable === false ?
                        <EditIcon onClick={toggleEditable} sx={{ fontSize: 27, }} />
                        :
                        <DoneIcon
                            onClick={() => { editBtn === false ? saveChanges() : toggleEditable() }}
                            sx={{ fontSize: 27, }}
                        />
                    }
                </div>
            </div>
            <form>
                <InputField
                    name='firstName'
                    text={formData.firstName}
                    label='First Name'
                    onInput={handleChange}
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='email'
                    text={formData.email}
                    label='Email'
                    onInput={handleChange}
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='phoneNumber'
                    text={formData.phoneNumber}
                    label='Phone'
                    placeHolderText='Enter Phone Number'
                    onInput={handleChange}
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='city'
                    text={formData.city}
                    label='City'
                    placeHolderText=''
                    onInput={handleChange}
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='streetAddress'
                    text={formData.streetAddress}
                    label='Street Address'
                    placeHolderText=''
                    onInput={handleChange}
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='password'
                    text={formData.password}
                    label='Password:'
                    onInput={handleChange}
                    placeHolderText='Current Password'
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='password'
                    onInput={handleChange}
                    placeHolderText='New Password'
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />
                <InputField
                    name='password'
                    // text={formData.password}
                    // onInput={handleChange}
                    placeHolderText='Confirm New Password'
                    readOnly={!editable}
                    customStyle={{ pointerEvents: editable === false ? 'none' : null, }}
                />

            </form>
            {editBtn === true ?
                <div className='buttons'>
                    <button onClick={() => setEditBtn(false)} className='btn' >Cancel</button>
                    <PrimaryButton
                        onClick={saveChanges}
                        label="Save Changes"
                    />
                </div> : null
            }
        </div>
    )
};

export default Form;