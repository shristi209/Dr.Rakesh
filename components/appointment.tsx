"use client"
import axios from "axios";

const Appointments = async () => {
    const timeSlots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
    ];

    const services = [
        "General Consultation",
        "Dental Consultation",
        "Blood Tests",
        "Ultrasound",
        "ECG (Electrocardiogram)",
        "Vaccination",
        "Eye Examination",
        "Physical Therapy",
        "Pediatric Care",
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const formData = new FormData(event.target as HTMLFormElement);
        const values: Record<string, string> = {};
        formData.forEach((value, key) => {
          values[key] = value.toString();
        });
    
        try {
          const response = await axios.post("/api/appointment", values);
          if (response.data.success) {
            console.log("Appointment booked successfully!");
          } else {
            console.error("Failed to book appointment");
          }
        } catch (error) {
          console.error("Error submitting appointment:", error);
          console.error("An error occurred while booking appointment");
        }
      };
    
    return (
        <div className="container mx-auto px-4 py-8 md:pt-20">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                        Book an Appointment
                    </h1>
                    <p className="text-gray-600 text-nowrap">
                        Schedule a consultation with{" "}
                        <span className="font-bold text-emerald-600">Dr. Rakesh Kumar Yadav</span>
                    </p>
                </div>

                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phonenumber" className="block text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phonenumber"
                                name="phonenumber"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="services" className="block text-gray-700">Service</label>
                            <select
                                id="service"
                                name="service"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="">Select the service</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="time" className="block text-gray-700">Time</label>
                            <select
                                id="time"
                                name="time"
                                className="w-full p-2 border border-gray-300 rounded"
                                required>
                                <option value="">Select a time</option>
                                {timeSlots.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="note" className="block text-gray-700">Note</label>
                            <textarea
                                id="note"
                                name="note"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter any additional notes"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white p-3 rounded hover:bg-emerald-700">
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
