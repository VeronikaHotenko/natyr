<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$clientmessage = htmlspecialchars($_POST["text"]);

// $check = is_array($_POST['check']) ? $_POST['check'] : array();
// $check = implode (', ', $check );

// $radio = htmlspecialchars($_POST["radio"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "vera.shysharina@mail.ru"; // e-mail администратора


// Отправка письма администратору сайта

$tema = "Тема письма админу";
$message_to_myemail = "Текст письма:<br>
$clientmessage 

<br><br>
Имя: $name<br>
E-mail: $email<br>
Телефон: $tel<br>
Источник (ссылка): $refferer";
// Чек-бокс: $check<br> 
// Радио: $radio<br> 

mail($myemail, $tema, $message_to_myemail, "From: HRCode <HRcode@info.ru> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Отправка письма пользователю

$tema = "Тема письма клиенту";
$message_to_myemail = "
Форма успешно отправлена. Мы скоро свяжемся с вами!<br>
Файл: <a href='http://forms.scrim.ru/file/musor.zip' download >Название файла</a>

";
$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: Sitename <HRcode@info.ru> \r\n Reply-To: Sitename \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Сохранение инфо о лидах в файл leads.xls

$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>  <td>$date / $time</td> <td>$clientmessage</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);

?>

