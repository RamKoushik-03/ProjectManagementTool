import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Image size should be less than 2MB');
        return;
      }

      // Update the image state
      setImage(file);
      // Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear file input
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex flex-col items-center mb-6'>
      <div className='flex justify-center mb-2'>  
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handleImageChange}
          className='hidden'
        />
        {!image ? (
          <div className='w-20 h-20 flex justify-center items-center bg-blue-100/50 rounded-full relative cursor-pointer'>
            <LuUser className="text-4xl text-primary"/>
            <button
              type='button'
              className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
              onClick={onChooseFile}
            >
              <LuUpload/>
            </button>
          </div> 
        ) : (
          <div className='relative'>
            <img 
              src={previewUrl} 
              alt='Profile Preview' 
              className='w-20 h-20 rounded-full object-cover' 
            />
            <button
              type='button'
              className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
              onClick={handleRemoveImage}
            >
              <LuTrash/>
            </button>
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </div>
  );
};

export default ProfilePhotoSelector;