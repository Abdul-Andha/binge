"use client";
import React, { useState } from "react";
import { Upload, message, Input, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Dragger } = Upload;
export default function UploadPodcast(){
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [episodeForm, setEpisodeForm] = useState({
      episodeName: "",
      episodeDescription: "",
      file_cid: "",
      user_id: "91b471b9-b429-4970-8a53-e0417222cd91"
    });
  
    function handleOnFormChange(event) {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setEpisodeForm({
        ...episodeForm,
        [fieldName]: fieldValue,
      });
    }
    const onFileChange = (info) => {
      
      setFile(info.file);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
  
    const onDrop = (e) => {
      console.log("Dropped files", e.dataTransfer.files);
    };
    const submitEpisode = async () => {
      console.log(file);
      await uploadFile();
      
    };
    const uploadFile = async () => {
      try {
        if (!file) {
          alert("No file selected");
          return;
        }
  
        setUploading(true);
        const data = new FormData();
        data.set("file", file);
        const uploadRequest = await fetch("/api/files/upload", {
          method: "POST",
          body: data,
        });
        const signedUrl = await uploadRequest.json();
        setUploading(false);
      } catch (e) {
        console.log(e);
        setUploading(false);
        alert("Trouble uploading file");
      }
    };
  
    const props = {
      name: "file",
      multiple: false,
      action: "/api/files/upload",
      accept:
        "mp3, wav, aac, flac, alac, ogg, wma, aiff, pcm, opus, amr, atrac, dts, dsd, midi, m4a",
      multiple: false,
      beforeUpload: (file) => {
        setFile(file);
        return false; // Prevent automatic upload
      },
      onChange: onFileChange,
      onDrop: onDrop,
    };
  
    return (
      <main className="w-full min-h-screen m-auto flex flex-col flex-start gap-y-5 max-w-4xl">
        <h1 className="text-xl text-left">
          <strong>Upload Episode</strong>
        </h1>
        <div>
          <h2 className="mb-2"> Episode Name</h2>
          <TextArea
            placeholder="Autosize height based on content lines"
            autoSize
            onChange={handleOnFormChange}
            name="episodeName"
            value={episodeForm.episodeName}
          />
          <div style={{ margin: "24px 0" }} />
          <h2 className="mb-2"> Episode Description</h2>
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={{ minRows: 2, maxRows: 6 }}
            value={episodeForm.episodeDescription}
            onChange={handleOnFormChange}
            name="episodeDescription"
          />
          <div style={{ margin: "24px 0" }} />
        </div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Supported formats: mp3, wav, aac, flac, alac, ogg, wma, aiff, pcm, opus, amr, atrac, dts, dsd, midi, m4a.</p>
        </Dragger>
        <Button className="min-h-7" onClick={submitEpisode}>
          Add Episode
        </Button>
      </main>
    );
  };