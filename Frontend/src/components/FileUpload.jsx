import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ type = 'image', onUpload, multiple = false, maxSize = 5 }) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
    };

    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => {
            const isValidType = type === 'image'
                ? file.type.startsWith('image/')
                : file.type.startsWith('video/');

            const isValidSize = file.size <= maxSize * 1024 * 1024;

            if (!isValidType) {
                alert(`Please upload ${type} files only`);
                return false;
            }
            if (!isValidSize) {
                alert(`File size should not exceed ${maxSize}MB`);
                return false;
            }
            return true;
        });

        if (multiple) {
            setFiles(prev => [...prev, ...validFiles]);
            generatePreviews([...files, ...validFiles]);
        } else {
            setFiles(validFiles);
            generatePreviews(validFiles);
        }
    };

    const generatePreviews = (fileList) => {
        const newPreviews = fileList.map(file => {
            if (type === 'image') {
                return URL.createObjectURL(file);
            } else {
                return null; // Videos don't need preview for now
            }
        });
        setPreviews(newPreviews);
    };

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviews(newPreviews);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select files to upload');
            return;
        }

        setUploading(true);
        try {
            const uploadedUrls = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append(type, file);

                const endpoint = type === 'image' ? '/api/upload/image' : '/api/upload/video';
                const response = await fetch(`http://localhost:5000${endpoint}`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (response.ok) {
                    uploadedUrls.push(`http://localhost:5000${data.url}`);
                } else {
                    throw new Error(data.message);
                }
            }

            onUpload(multiple ? uploadedUrls : uploadedUrls[0]);
            setFiles([]);
            setPreviews([]);
            alert('Files uploaded successfully!');
        } catch (error) {
            alert('Error uploading files: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <div
                className={`file-upload-dropzone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    multiple={multiple}
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />

                <div className="upload-icon">
                    {type === 'image' ? <ImageIcon size={48} /> : <Film size={48} />}
                </div>
                <p className="upload-text">
                    Drag & drop {type}s here or click to browse
                </p>
                <p className="upload-hint">
                    Max size: {maxSize}MB {multiple && '• Multiple files allowed'}
                </p>
            </div>

            {files.length > 0 && (
                <div className="file-preview-section">
                    <h4>Selected Files ({files.length})</h4>
                    <div className="file-preview-grid">
                        {files.map((file, index) => (
                            <div key={index} className="file-preview-item">
                                {type === 'image' && previews[index] && (
                                    <img src={previews[index]} alt={file.name} />
                                )}
                                {type === 'video' && (
                                    <div className="video-placeholder">
                                        <Film size={32} />
                                    </div>
                                )}
                                <div className="file-info">
                                    <p className="file-name">{file.name}</p>
                                    <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                    className="remove-file-btn"
                                    onClick={() => removeFile(index)}
                                    type="button"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className="upload-btn"
                        onClick={handleUpload}
                        disabled={uploading}
                        type="button"
                    >
                        {uploading ? 'Uploading...' : `Upload ${files.length} ${type}(s)`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
