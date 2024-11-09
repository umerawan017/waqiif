<?php
/**
 * PHP Email Form Library
 * Handle form submission and email sending
 */

class PHP_Email_Form {
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    public $headers;
    public $ajax = false;

    // Method to add a message (this will be the form's content)
    public function add_message($message, $field_name) {
        $this->message .= "$field_name: $message\n";
    }

    // Send email
    public function send() {
        $headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
        $headers .= "Reply-To: " . $this->from_email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send the email
        $mail_sent = mail($this->to, $this->subject, $this->message, $headers);

        if ($mail_sent) {
            return 'OK'; // Success
        } else {
            return 'Error: Unable to send email';
        }
    }
}
?>
