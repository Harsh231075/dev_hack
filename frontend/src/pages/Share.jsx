import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Share2, Copy, Check } from "lucide-react";
import { useParams } from "react-router-dom";

function QRCodeGenerator() {
  const [copied, setCopied] = useState(false);
  const [qrStyle, setQrStyle] = useState({
    bgColor: "#FFFFFF",
    fgColor: "#000000",
  });
  const { eventId } = useParams();

  const qrUrl = `${window.location.origin}/feedback/${eventId}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Remove window.open to prevent redirection
  };

  const handleStyleChange = (updates) => {
    setQrStyle((prev) => ({ ...prev, ...updates }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Feedback Form",
          text: "Please provide your feedback using the link below.",
          url: qrUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        alert("Sharing failed. Please copy the link manually.");
      }
    } else {
      alert("Sharing is not supported on this browser. Please copy the link manually.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="color"
              value={qrStyle.bgColor}
              onChange={(e) => handleStyleChange({ bgColor: e.target.value })}
              className="mt-1 block w-full h-10 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              QR Code Color
            </label>
            <input
              type="color"
              value={qrStyle.fgColor}
              onChange={(e) => handleStyleChange({ fgColor: e.target.value })}
              className="mt-1 block w-full h-10 rounded-md"
            />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <QRCodeSVG
            value={qrUrl}
            size={200}
            bgColor={qrStyle.bgColor}
            fgColor={qrStyle.fgColor}
            level="H"
          />
        </div>

        <div className="flex space-x-4 w-full">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-500" />
            )}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
          >
            <Share2 className="w-5 h-5" />
            <span>Share QR Code</span>
          </button>
        </div>

        <div className="text-sm text-gray-500 text-center">
          <p>Scan to provide feedback and earn 50 points!</p>
          <p>Works offline • Multiple languages supported</p>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;