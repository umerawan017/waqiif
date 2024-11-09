<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    // Validate the email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $file = 'subscribers.txt'; // Adjust path if needed

        // Check if the email already exists in the file
        $emails = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (in_array($email, $emails)) {
            // Email already exists response
            echo 'This email is already subscribed!';
        } else {
            // Append the email to the text file
            file_put_contents($file, $email . PHP_EOL, FILE_APPEND);
            // Subscription successful response
            echo 'OK';
        }
    } else {
        // Invalid email response
        echo 'Invalid email address!';
    }
}
?>