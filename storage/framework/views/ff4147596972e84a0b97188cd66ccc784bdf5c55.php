<!DOCTYPE html>
<html>
    <head>
        <title>crypto-casino.online - Crypto Casino</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, minimum-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <meta property="og:image" content="<?php echo e(asset('/img/misc/promo.png')); ?>" />
        <meta property="og:image:secure_url" content="<?php echo e(asset('/img/misc/promo.png')); ?>" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="295" />
        <meta property="og:image:height" content="295" />
        <meta property="og:site_name" content="crypto-casino.online" />

        <?php if(env('APP_DEBUG')): ?>
            <meta http-equiv="Expires" content="Mon, 26 Jul 1997 05:00:00 GMT">
            <meta http-equiv="Pragma" content="no-cache">
        <?php endif; ?>

        <link rel="icon" href="<?php echo e(asset('/favicon.svg')); ?>">
        <link rel="manifest" href="/manifest.json">

        <script type="text/javascript">
            window.Layout = {
                Frontend: '<?php echo base64_encode(file_get_contents(public_path('css/app.css'))); ?>',
                Backend: '<?php echo base64_encode(file_get_contents(public_path('css/admin/app.css'))); ?>'
            }
        </script>

        <script>
            window.Notifications = {
                vapidPublicKey: '<?php echo e(config('webpush.vapid.public_key')); ?>'
            };
        </script>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155249704-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-155249704-1');
        </script>
    </head>
    <body>
        <div id="app">
            <layout></layout>
        </div>

        <script src="<?php echo e(asset(mix('/js/app.js'))); ?>"></script>

        <?php if(env('APP_DEBUG')): ?>
            <script src="http://localhost:8098"></script>
        <?php endif; ?>
    </body>
</html>
<?php /**PATH /var/www/html/resources/views/layouts/app.blade.php ENDPATH**/ ?>