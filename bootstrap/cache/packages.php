<?php return array (
  'arcanedev/log-viewer' => 
  array (
    'providers' => 
    array (
      0 => 'Arcanedev\\LogViewer\\LogViewerServiceProvider',
      1 => 'Arcanedev\\LogViewer\\Providers\\DeferredServicesProvider',
    ),
  ),
  'arielmejiadev/larapex-charts' => 
  array (
    'providers' => 
    array (
      0 => 'ArielMejiaDev\\LarapexCharts\\LarapexChartsServiceProvider',
    ),
    'aliases' => 
    array (
      'LarapexCharts' => 'ArielMejiaDev\\LarapexCharts\\Facades\\LarapexCharts',
    ),
  ),
  'barryvdh/laravel-debugbar' => 
  array (
    'providers' => 
    array (
      0 => 'Barryvdh\\Debugbar\\ServiceProvider',
    ),
    'aliases' => 
    array (
      'Debugbar' => 'Barryvdh\\Debugbar\\Facade',
    ),
  ),
  'facade/ignition' => 
  array (
    'providers' => 
    array (
      0 => 'Facade\\Ignition\\IgnitionServiceProvider',
    ),
    'aliases' => 
    array (
      'Flare' => 'Facade\\Ignition\\Facades\\Flare',
    ),
  ),
  'fideloper/proxy' => 
  array (
    'providers' => 
    array (
      0 => 'Fideloper\\Proxy\\TrustedProxyServiceProvider',
    ),
  ),
  'fruitcake/laravel-cors' => 
  array (
    'providers' => 
    array (
      0 => 'Fruitcake\\Cors\\CorsServiceProvider',
    ),
  ),
  'intervention/image' => 
  array (
    'providers' => 
    array (
      0 => 'Intervention\\Image\\ImageServiceProvider',
    ),
    'aliases' => 
    array (
      'Image' => 'Intervention\\Image\\Facades\\Image',
    ),
  ),
  'jenssegers/agent' => 
  array (
    'providers' => 
    array (
      0 => 'Jenssegers\\Agent\\AgentServiceProvider',
    ),
    'aliases' => 
    array (
      'Agent' => 'Jenssegers\\Agent\\Facades\\Agent',
    ),
  ),
  'jenssegers/mongodb' => 
  array (
    'providers' => 
    array (
      0 => 'Jenssegers\\Mongodb\\MongodbServiceProvider',
      1 => 'Jenssegers\\Mongodb\\MongodbQueueServiceProvider',
    ),
  ),
  'laravel-notification-channels/discord' => 
  array (
    'providers' => 
    array (
      0 => 'NotificationChannels\\Discord\\DiscordServiceProvider',
    ),
  ),
  'laravel-notification-channels/webpush' => 
  array (
    'providers' => 
    array (
      0 => 'NotificationChannels\\WebPush\\WebPushServiceProvider',
    ),
  ),
  'laravel/sanctum' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Sanctum\\SanctumServiceProvider',
    ),
  ),
  'laravel/tinker' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Tinker\\TinkerServiceProvider',
    ),
  ),
  'laravel/ui' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Ui\\UiServiceProvider',
    ),
  ),
  'morrislaptop/laravel-queue-clear' => 
  array (
    'providers' => 
    array (
      0 => 'Morrislaptop\\LaravelQueueClear\\LaravelQueueClearServiceProvider',
    ),
  ),
  'nesbot/carbon' => 
  array (
    'providers' => 
    array (
      0 => 'Carbon\\Laravel\\ServiceProvider',
    ),
  ),
  'nunomaduro/collision' => 
  array (
    'providers' => 
    array (
      0 => 'NunoMaduro\\Collision\\Adapters\\Laravel\\CollisionServiceProvider',
    ),
  ),
  'pragmarx/tracker' => 
  array (
    'providers' => 
    array (
      0 => 'PragmaRX\\Tracker\\Vendor\\Laravel\\ServiceProvider',
    ),
    'aliases' => 
    array (
      'Tracker' => 'PragmaRX\\Tracker\\Vendor\\Laravel\\Facade',
    ),
  ),
  'qoraiche/laravel-mail-editor' => 
  array (
    'providers' => 
    array (
      0 => 'qoraiche\\mailEclipse\\mailEclipseServiceProvider',
    ),
    'aliases' => 
    array (
      'mailEclipse' => 'qoraiche\\mailEclipse\\Facades\\mailEclipse',
    ),
  ),
  'spatie/laravel-analytics' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\Analytics\\AnalyticsServiceProvider',
    ),
    'aliases' => 
    array (
      'Analytics' => 'Spatie\\Analytics\\AnalyticsFacade',
    ),
  ),
  'torann/geoip' => 
  array (
    'providers' => 
    array (
      0 => 'Torann\\GeoIP\\GeoIPServiceProvider',
    ),
    'aliases' => 
    array (
      'GeoIP' => 'Torann\\GeoIP\\Facades\\GeoIP',
    ),
  ),
  'tymon/jwt-auth' => 
  array (
    'aliases' => 
    array (
      'JWTAuth' => 'Tymon\\JWTAuth\\Facades\\JWTAuth',
      'JWTFactory' => 'Tymon\\JWTAuth\\Facades\\JWTFactory',
    ),
    'providers' => 
    array (
      0 => 'Tymon\\JWTAuth\\Providers\\LaravelServiceProvider',
    ),
  ),
);