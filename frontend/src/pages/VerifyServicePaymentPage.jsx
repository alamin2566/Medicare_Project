import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const API_BASE = "https://medicare-p53k.vercel.app";
   
const VerifyServicePaymentPage = () => {
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(()=>{
    let cancelled = false;
    const verifyPayment = async () => {
        const params = new URLSearchParams(location.search || "");
        const sessionId = params.get("session_id");

        if (location.pathname === '/service-appointment/cancel') {
            if (!cancelled)
                navigate("/appointments?service_payment_status=cancelled", { replace: true });
            return;
        }

        if (!sessionId) {
            if (!cancelled)
                navigate("/appointments?service_payment_status=failed", { replace: true });
            return;
        }

        try {
            const res = await axios.get(`${API_BASE}/api/service-appointments/confirm`, {
                params: { session_id: sessionId },
                timeout: 15000,
            });

            if (cancelled) return;

            if (res?.data.success) {
                navigate("/appointments?service_payment_status=Paid", { replace: true });
            } else {
                navigate("/appointments?service_payment_status=failed", { replace: true });
            }
        } catch (error) {
            console.error(" service  verifyPayment failed:", error);
            if (!cancelled)
                navigate("/appointments?service_payment_status=failed", { replace: true });
        }

    }

    verifyPayment();
    return () => { cancelled = true; };

   },[location, navigate]);

  return null;
}

export default VerifyServicePaymentPage