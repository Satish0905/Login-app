"use client";
import React, { useState }  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";


interface userParams{
  eventName?:string,
  category?:string,
  startDate?:string,
  endDate?:string,
  minSeats?:string,
  maxSeats?:string,
  description?:string
}


export default function Addevent() {
  const router = useRouter();
  const [backendError, setBackendError] = useState<string | null>(null);      //state's



  const validate= (values:userParams)=>{
    const errors:userParams={}
    if (!values.eventName) {
        errors.eventName = "Event Name is required";
      }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!values.endDate) {
      errors.endDate = "End Date is required";
    }
    if (!values.minSeats) {
      errors.minSeats = "Minimum Seats is required";
    } else if (values.minSeats.length <= 0) {
      errors.minSeats = "Minimum Seats must be greater than 0";
    }
    if (!values.maxSeats) {
      errors.maxSeats = "Maximum Seats is required";
    }
    if(values.maxSeats && values.minSeats && values.minSeats>= values.maxSeats) {
      errors.maxSeats = "Maximum Seats must be greater than Minimum Seats";
    }
    if (!values.description) {
      errors.description = "Event Description is required";
    }

    
    return errors;
  }


  const formik = useFormik({
    initialValues: {
      visibility: "Public",
      eventName: "",
      category: "",
      startDate: "",
      endDate: "",
      eventType: "",
      entryFee: false,
      feeAmount:"",
      feeCurrency:"",
      rules: "",
      minSeats: "",
      maxSeats: "",
      prize: false,
      extras: "",
      description: "",
      images: null,
    },
    validate,
    onSubmit:(values)=>{
      setBackendError(null);

      axios
        .post("http://localhost:8000/addevent",values)
        .then(()=>{
          router.push("/");
        })
        .catch((err)=>{
          if(err.response && err.response.data) {
            setBackendError(err.response.data.message || "An error occurred.");
          } else {
            setBackendError("An unexpected error occurred.");
          }
        });
      }






    // onSubmit: async (values) => {
    //   try {
    //     // const formData = new FormData();
    //     // Object.keys(values).forEach((key) => {
    //     //   if (key === "images" && values.images) {
    //     //     formData.append(key, values.images); 
    //     //   } else {
    //     //     formData.append(key, values[key]);
    //     //   }
    //     // });

    //     await axios.post("http://localhost:8000/addevent", values, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //     alert("Event submitted successfully!");
    //     router.push("/"); 
    //   } catch (error) {
    //     console.error("Error submitting event:", error);
    //     alert("Failed to submit event.");
    //   }
    // },
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Add Event</h1>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {/* Visibility */}
        <div className="mb-3">
          <label className="form-label">Visibility</label>
          <div>
            <label className="form-check-label me-3">
              <input
                type="radio"
                name="visibility"
                value="Public"
                checked={formik.values.visibility === "Public"}
                onChange={formik.handleChange}
                className="form-check-input"
              />
              Public
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                name="visibility"
                value="Private"
                checked={formik.values.visibility === "Private"}
                onChange={formik.handleChange}
                className="form-check-input"
              />
              Private
            </label>
          </div>
        </div>

        {/* Event Name */}
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            name="eventName"
            className="form-control"
            value={formik.values.eventName}
            onChange={formik.handleChange}
          />
          {formik.errors.eventName && (
            <div className="text-danger">{formik.errors.eventName}</div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Event Category</label>
          <select
            name="category"
            className="form-select"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="sports">Sport event</option>
            <option value="music">Music event</option>
            <option value="education">Education event</option>
          </select>
          {formik.errors.category && (
            <div className="text-danger">{formik.errors.category}</div>
          )}
        </div>

        {/* Start and End Date */}
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={formik.values.startDate}
            onChange={formik.handleChange}
          />
          {formik.errors.startDate && (
            <div className="text-danger">{formik.errors.startDate}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formik.values.endDate}
            onChange={formik.handleChange}
          />
          {formik.errors.endDate && (
            <div className="text-danger">{formik.errors.endDate}</div>
          )}
        </div>

        {/* Event Type */}
        <div className="mb-3">
          <label className="form-label">Event Type</label>
          <select
            name="eventType"
            className="form-select"
            value={formik.values.eventType}
            onChange={formik.handleChange}
          >
            <option value="">Select</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="competition">Competition</option>
          </select>
        </div>

        {/* Entry Fee */}
        <div className="mb-3 form-check">
  <input
    type="checkbox"
    name="entryFee"
    className="form-check-input"
    checked={formik.values.entryFee}
    onChange={(e) => {
      formik.handleChange(e);
      if (!e.target.checked) {
        // Reset fee details when unchecked
        formik.setFieldValue("feeAmount", "");
        formik.setFieldValue("feeCurrency", "");
      }
    }}
  />
  <label className="form-check-label">Do you have an entry fee?</label>
</div>

{formik.values.entryFee && (
  <div className="mb-3">
    <label className="form-label">Entry Fee Details</label>
    <div className="row">
      {/* Fee Amount */}
      <div className="col-md-6">
        <input
          type="number"
          name="feeAmount"
          className="form-control"
          placeholder="Enter Fee Amount"
          value={formik.values.feeAmount || ""}
          onChange={formik.handleChange}
        />
        {formik.errors.feeAmount && (
          <div className="text-danger">{formik.errors.feeAmount}</div>
        )}
      </div>
      {/* Fee Currency */}
      <div className="col-md-6">
        <select
          name="feeCurrency"
          className="form-select"
          value={formik.values.feeCurrency || ""}
          onChange={formik.handleChange}
        >
          <option value="">Select Currency</option>
          <option value="USD">US</option>
          <option value="EUR">Germany</option>
          <option value="INR">Indian</option>
        </select>
        {formik.errors.feeCurrency && (
          <div className="text-danger">{formik.errors.feeCurrency}</div>
        )}
      </div>
    </div>
  </div>
)}


        {/* Min and Max Seats */}
        <div className="mb-3">
          <label className="form-label">Min Seats</label>
          <input
            type="number"
            name="minSeats"
            className="form-control"
            value={formik.values.minSeats}
            onChange={formik.handleChange}
          />
          {formik.errors.minSeats && (
            <div className="text-danger">{formik.errors.minSeats}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Max Seats</label>
          <input
            type="number"
            name="maxSeats"
            className="form-control"
            value={formik.values.maxSeats}
            onChange={formik.handleChange}
          />
          {formik.errors.maxSeats && (
            <div className="text-danger">{formik.errors.maxSeats}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Event Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>

        {/* File Upload */}
        {/* <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={(event) =>
              formik.setFieldValue("images", event.currentTarget.files[0])
            }
          />
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
