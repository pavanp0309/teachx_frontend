import React from "react";
import { Modal, Row, Col, Button, message, Typography } from "antd";
import { CopyOutlined, WhatsAppOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ShareModal = ({ visible, onCancel, batchCode }) => {
  const handleShare = (platform) => {
    const shareLink = `${window.location.origin}/join-batch?code=${batchCode}`;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Join this batch: ${shareLink}`)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank"); // Open sharing URL in a new tab
  };

  const handleCopyBatchCode = () => {
    navigator.clipboard.writeText(batchCode);
    message.success("Batch code copied to clipboard!");
  };

  return (
    <Modal
      title="Share Batch"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={400} // Set a fixed width for the modal
    >
      {/* Batch Code Section */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Text strong style={{ fontSize: 16 }}>Batch Code:</Text>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
          <Text code style={{ fontSize: 18, marginRight: 8 }}>{batchCode}</Text>
          <Button
            type="text"
            icon={<CopyOutlined style={{ fontSize: 18 }} />}
            onClick={handleCopyBatchCode}
          />
        </div>
      </div>

      {/* Sharing Icons Section */}
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button
            type="text"
            icon={<WhatsAppOutlined style={{ fontSize: 28, color: "#25D366" }} />}
            onClick={() => handleShare("whatsapp")}
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<FacebookOutlined style={{ fontSize: 28, color: "#1877F2" }} />}
            onClick={() => handleShare("facebook")}
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<InstagramOutlined style={{ fontSize: 28, color: "#E4405F" }} />}
            onClick={() => handleShare("instagram")}
          />
        </Col>
        <Col>
          <Button
            type="text"
            icon={<LinkedinOutlined style={{ fontSize: 28, color: "#0A66C2" }} />}
            onClick={() => handleShare("linkedin")}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShareModal;