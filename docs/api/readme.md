## Genel Durumlar

- Gönderilen tüm datalar JSON formatında olmalı. Bu yüzden request yaparken HTTP headerlarında `content-type: application/json;charset=UTF-8` bilgisi eklenmeli.

- Çoklu dil için URL'e `lang=fr-FR` datası eklenmeli. Örneğin `https://api.adoptez1artisan.com/auth/login?lang=fr-FR` Buraya istek attığınızda gelen data yada hata mesajları Fransızca olacaktır. Tanımlı diller: `en-US` `fr-FR`

- JSON standart formatı:
    - Başarılı cevap formatı:`{"data": {[detailed-data-here]} ,"status": "success"}`
    - `data` değerinde yapılan requeste ait datalar gelir.
    - `status` değerinde `success` veya `error` gelir.
    - Eğer `error` gelirse format değişir. `data` değeri gelmez. Seçilen dile göre bir hata mesajı içeren `errorMessage` değeri gelir. Bazı durumlarda da `exceptionType` gelir. `exceptionType` değeri daha detaylı hata mesajları vermek için frontend tarafında kullanılabilir. Örnek hatalı cevap:

```
{
  "status": "error",
  "errorMessage": "User not authenticated or your account suspended.",
  "exceptionType": "UserNotFoundException"
}
```



<hr />


### Login Olmak

`POST https://api.adoptez1artisan.com/auth/login`
```
{
  "email": "admin@system.com",
  "password": "123123"
}
```
**Response:**

```
{
  "data": {
    "token": "64f625fc7a5467ee776c3ca82ca6e9a3",
    "userData": {
      "id": 1,
      "role_id": 1,
      "role_key": "admin",
      "lang_code": "en-US",
      "firstname": "Admin",
      "lastname": "System",
      "email": "admin@system.com",
      "facebook_id": null,
      "google_id": null,
      "status": "active",
      "created_at": "2021-09-11 17:54:46",
      "updated_at": "2021-09-11 17:54:46",
      "fullname": "Admin System",
      "profile": {
        "id": 1,
        "user_id": 1,
        "avatar": null,
        "email_verified_at": null,
        "phone": null,
        "phone_verified_at": null,
        "birthday": null,
        "gender": "prefer_not_to_say",
        "address": null,
        "company_description": null,
        "lat": null,
        "lng": null,
        "zip": null,
        "portfolio_images": null,
        "intervention_distance": 30,
        "email_notification": "per_day",
        "sms_notification": "no",
        "created_at": "2021-09-11 17:54:46",
        "updated_at": "2021-09-11 17:54:46"
      }
    }
  },
  "status": "success"
}
```

Burada `token` bilgisi bearer auth için kullanılır. Bundan sonraki tüm istekler `authorization: Bearer 64f625fc7a5467ee776c3ca82ca6e9a3` headerıyla atılmalı.


<hr />

### Uygulama Bilgilerini Almak

Projenin ayarları, kullanıcı bilgisi, yetkiler, panel menüsü gibi panelin çalışması için gerekli bilgiler bu API'den alınır.

`GET https://api.adoptez1artisan.com/user/appData`

**Response:**

<a href="./json/app_data.json">JSON Dosyasını Aç</a>




<hr />

### Tanımlı Dil Çevirilerini Almak


Projedeki tüm dillerin key-value değerlerini almak için kullanılır.


`GET https://api.adoptez1artisan.com/languages`

**Response:** (Response datası çok uzun olduğu için kısaltılmıştır.)


```
{
  "data": {
    "languages": {
      "en-US": {
        "0": "English (American)",
        "Welcome": "Welcome",
        "Reset Password": "Reset Password",
        "Verify Email": "Verify Email",
        "Deactivate Account": "Deactivate Account",
        "Invoice": "Invoice",
        "Promotional": "Promotional",
        "Miscellaneous": "Miscellaneous",
        "unknown_command": "Unknown command."
      },
      "fr-FR": {
        "0": "Français (La France)",
        "Authentication": "Authentification",
        "Login v1": "Connexion v1",
        "Login v2": "Connexion v2",
        "Register v1": "S'inscrire v1",
        "Register v2": "S'inscrire v2",
        "Forgot Password v1": "Mot de passe oublié v1",
        "Forgot Password v2": "Mot de passe oublié v2",
        "Reset Password v1": "réinitialiser le mot de passe v1",
        "Reset Password v2": "réinitialiser le mot de passe v2",
        "Account Settings": "Paramètres du compte",
        "Profile": "Profil"
      }
    }
  },
  "status": "success"
}
```


<hr />

### Ana Kategorileri Almak


Ana kategorileri almak için kullanılır.


`GET https://api.adoptez1artisan.com/public/categories/listMainCategories`

**Response:**

```
{
  "data": [
    {
      "id": 52,
      "parent_id": null,
      "name": "Do It Yourself (DIY)",
      "slug": "52-do-it-yourself-diy",
      "description": "Do It Yourself (DIY) category description.",
      "image": "https://api.adoptez1artisan.com/assets/images/no-image.png",
      "status": "active",
      "created_at": "2021-04-24 18:49:30",
      "updated_at": "2021-07-05 20:32:59"
    },
    {
      "id": 49,
      "parent_id": null,
      "name": "Ebénisterie",
      "slug": "49-ebenisterie",
      "description": "Cabinetmaking category description.",
      "image": "https://api.adoptez1artisan.com/assets/images/no-image.png",
      "status": "active",
      "created_at": "2021-04-24 18:49:30",
      "updated_at": "2021-10-19 17:39:42"
    },
    {
      "id": 46,
      "parent_id": null,
      "name": "Ascenseurs",
      "slug": "46-ascenseurs",
      "description": "Elevators category description.",
      "image": "https://api.adoptez1artisan.com/assets/images/no-image.png",
      "status": "active",
      "created_at": "2021-04-24 18:49:30",
      "updated_at": "2021-10-19 17:47:32"
    }
  ],
  "draw": 0,
  "recordsTotal": 22,
  "recordsFiltered": 22,
  "status": "success"
}
```


<hr />

### Kategori Detaylarını Almak


`GET https://api.adoptez1artisan.com/public/categories/getBySlug/[SLUG]`


**Response:**


<a href="./json/kategori_detaylarini_almak.json">JSON Dosyasını Aç</a>



<hr />

### Blogları Almak


`GET https://api.adoptez1artisan.com/public/blogs/list?status=active&length=6`


**Response:**

```
{
  "data": [
    {
      "id": 335,
      "title": "test servisi nedir",
      "slug": "335-test-servisi-nedir",
      "image": "https://api.adoptez1artisan.com/storage/blog/335-test-servisi-nedir_335.png",
      "content": "test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... \r\n\r\ntest servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur... test servisi iyidir hoştur...",
      "status": "active",
      "created_at": "2021-09-20 19:35:13",
      "updated_at": "2021-09-20 19:48:35",
      "content_img": [
        [
          "CONTENT",
          true
        ],
        [
          "IMG",
          true
        ]
      ]
    },
    {
      "id": 334,
      "title": "test servisinin faydaları",
      "slug": "334-test-servisinin-faydalari",
      "image": "https://api.adoptez1artisan.com/storage/blog/334-test-servisinin-faydalari_334.png",
      "content": "test servisi iyidir hoştur çok faydalıdır...",
      "status": "active",
      "created_at": "2021-09-20 19:34:07",
      "updated_at": "2021-09-20 19:49:10",
      "content_img": [
        [
          "CONTENT",
          true
        ],
        [
          "IMG",
          true
        ]
      ]
    }
  ],
  "draw": 0,
  "recordsTotal": 335,
  "recordsFiltered": 335,
  "status": "success"
}
```


<hr />

### Son Açılmış Olan İşler


`GET https://api.adoptez1artisan.com/public/clientProjects/latestJobs?status=pending`

Son açılmış işleri getirir. İşi açan kullanıcının bilgileri, servis bilgileri, servis aşamaları (wizard form) gibi datalar buradadır.

**Response:**

<a href="./json/son_acilmis_olan_isler.json">JSON Dosyasını Aç</a>




<hr />

### İş Aramak


`GET https://api.adoptez1artisan.com/public/clientProjects/searchProjects?page=1&zipCode=75001&categoryId=1&search=`


Esnaf login olduktan sonra işleri listeleyebilir ve bu işleri şehire göre, kategoriye göre ve belirlediği bir metin girdisine göre filtreleyebilir. Bu işlemi yapmak için yukarıdaki API kullanılır. Parametrelerin açıklaması:

- `page`: İşler sayfalı olarak çağırılır. İlk sayfa 1'den başlamalıdır.
- `zipCode`: Seçtiği şehrin posta kodu bilgisidir.
- `categoryId`: Seçilen kategorinin id'sidir. Sadece ana kategoriye göre filtrelenir. Ana kategori ve onun altındaki kategoriler sistem tarafından bulunup işler filtrelenir.
- `search`: Kullanıcının belirlediği arama kelimeleri burada ayarlanır.



**Response:**

<a href="./json/is_arama.json">JSON Dosyasını Aç</a>






<hr />

### Teklif Ettiğim İşler (MyBids)


`GET https://api.adoptez1artisan.com/public/clientProjects/myBids?page=1&zipCode=75001&categoryId=1&search=`


Esnaf login olduktan sonra başvurduğu işleri sayfalı şekilde listeleyebilir. Bu işlemi yapmak için yukarıdaki API kullanılır. Parametrelerin açıklaması:

- `page`: İşler sayfalı olarak çağırılır. İlk sayfa 1'den başlamalıdır.



**Response:**

<a href="./json/my_bids.json">JSON Dosyasını Aç</a>




<hr />


### Servis Detaylarını Almak


`GET https://api.adoptez1artisan.com/public/services/getBySlug/[SLUG]`


**Response:**


<a href="./json/servis_detaylarini_almak.json">JSON Dosyasını Aç</a>



<hr />

## Socket.io iletişimi

Socket.io adresi: `wss://ws.adoptez1artisan.com/socket.io/`


### Client tarafındaki event:

Event adı: `receiveMessage`

Data formatı:

```
{
    user_id: message.user_id,
    uuid: message.uuid,
    message: message.message,
    media_url: message.media_url,
    created_at: message.created_at,
    user: {
        fullname: message.user.fullname
    }
}
```

### Server tarafındaki event:

Event adı: `sendMessage`

Data formatı:

```
{
    uuid: uuid,
    room_id: self.roomId,
    message: message,
    media_url: null
}

```

### Chat algoritması:

Chat listesini şu adresten alıyoruz:

`GET https://api.adoptez1artisan.com/chat/getMyRooms?page=1`


**Response:**


<a href="./json/get_my_rooms.json">JSON Dosyasını Aç</a>


Görüldüğü üzere buradaki `data.rooms.data[0].id` değeri room id değeridir.





### Belirli odaya ait son mesajları almak:



`GET https://api.adoptez1artisan.com/chat/getMessages?roomId=1&lastMessageId=0`


Buradaki `roomId` değerine yukarıda aldığımız room id'yi veriyoruz. `lastMessageId` değerine ise ilk requestte sıfır (`0`) veriyoruz böylece son mesajları alabiliriz, sonra gelen datadaki mesajlara ait en küçük id'yi atama yaparak sayfalı şekilde eski mesajları da alabiliriz. Örnek data:


<a href="./json/get_my_rooms.json">JSON Dosyasını Aç</a>


Bu json dosyasındaki mesajlara `data.messages` dizisinden ulaşabilirsin.


Chat odası ve chat mesajlarını bu şekilde aldıktan sonra socketio üzerinden iletişim kurma şeklini şöyle tarif edebiliriz. Yukarıda da belirtildiği üzere client ve server tarafında iki adet event var. Bunlar `receiveMessage` ve `sendMessage`. Client'ta `sendMessage` yukarıda belirtilen json datasıyla birlikte emit edilirse server tarafı bu bilgiyi alır ve chat api'sine request atar ve mesaj db'ye kaydedilmiş olur. Sonra ordan gelen bilgiye göre bu mesaj hangi kullanıcıya iletilecekse o kullanıcının açmış olduğu soketlere bu mesaj gönderilir. Client tarafında `receiveMessage` eventı dinlendiği için mesaj karşıdaki kullanıcının login olduğu browserlara anlık olarak gönderilmiş olur.


<hr />


### İmaj upload etmek

Bir servis için proje açarken müşteriler imaj yüklemek isteyebilirler. Bunun için önce imajın yüklenmesi ve oradan dönen imaj url'sinin tarayıcı veya mobil uygulama tarafında tutulması gerekiyor. Proje oluştururken bu url gönderilecek. İmaj yükleme adresi:

`POST https://api.adoptez1artisan.com/uploadManager/upload`

Request atarken `content-type: multipart/form-data` headerıyla birlikte istek atmak gerekiyor. Form datası olarak `file0` değişkenini set edilmesi gerekiyor. İşlem sonucunda dönen değer:

```
{
    "data": {
        "urls": [
            "https://api.adoptez1artisan.com/storage/uploads/ca6c31d176db33f2d86c781d35fc292599e0b790.png"
        ]
    },
    "status": "success"
}
```

Buradaki `urls` dizisinin ilk elemanını kullanabiliriz.



### Servise proje eklemek

Bir servise proje eklemek için öncelikle kullanıcının login olması gerekmektedir. Login olma api'si yukarıda belirtilmiştir. Ardından şu url kullanarak bir servis için proje açılabilir:

`POST https://api.adoptez1artisan.com/client/clientProjects/save`

Buraya göndereceğiniz datalar şu şekilde olmalı:

```
{
    "slug": "SERVIS_SLUG_DEGERI",
    "zipCode": [zip_code]
    "steps": {
        "foo": "foo_val",
        "bar": "bar_val",
        "baz": "baz_val"
    }
}
```

Buradaki `steps` yazan kısım dinamiktir ve her servis için farklı olabilir. Bunları yukarıda belirtilen 'Servis Detaylarını Almak' apisinden gelen değerlerin yazılması gerekiyor. Gerçek dünyaya ait örnek data şu şekilde olabilir:

```
{
    "slug": "250-architecto-itaque",
    "zipCode": "75001",
    "steps": {
        "surface_m2": "11",
        "ceiling_height": "11",
        "current_color": "111",
        "some_description": "111",
        "condition_surface": "Example condition",
        "paint_color_type": [
            "Average condition"
        ],
        "project_details": "details here",
        "photos": [
            "https://adoptez-backend.host/storage/uploads/380ec139c199fdff9d9c5788513b3a0b3888accf.jpeg",
            "https://adoptez-backend.host/storage/uploads/6c6c6b832d4eb734d7b146e022cf270ac4b27db1.jpeg",
            "https://adoptez-backend.host/storage/uploads/ca6c31d176db33f2d86c781d35fc292599e0b790.png"
        ],
        "preferred_service_provider": "offer_from_other_artisans"
    }
}
```



### Mevcut bir projeye başvuru yapmak

Artisan'lar client'ların açtıkları projelere başvuru yapabilmek için sisteme login olmuş olmaları gerekmektedir. Login olduktan sonra bir projeye başvuru yapabilmek için şu url'yi kullanmak gerekir. Buradaki `[project_id]` kısmı dinamiktir ve seçilen projenin id'si buraya girilmelidir:

`POST https://api.adoptez1artisan.com/user/makeBid/[project_id]`

Gönderilmesi gereken data:

```
{
    "bid": "teklif metni buraya"
}
```





## Projenin sunucuya kurulması

Repoda dört adet proje vardır, bir tane veritabanı vardır. Projeler api, admin panel, web sitesi, websocket (socket.io) sunucusudur. Bu yüzden dört tane subdomaine ihtiyacımız var. Her proje farklı domainlerde çalışması gerekiyor. Her proje aynı domainde barınamaz. Bu domainler örnek olarak şunlardır:

1- Site projesi ana domainde çalışır Örneğin adoptez1artisan.com veya www.adoptez1artisan.com
2- Api projesi: api.adoptez1artisan.com
3- Admin paneli: admin.adoptez1artisan.com
4- Websocket projesi: ws.adoptez1artisan.com

Veritabanını api projesinin olduğu subdomain'de açmamız gerekiyor. DB bilgilerini api projesinin kurulumu esnasında ihtiyacımız olacağı için bir kenara not almamız lazım.

Cpanel veya başka hosting yönetim panellerinden bu domainler açılır. Sonra her biri için `ssh` kullanıcı adı ve şifre belirlenir. Tüm projelerde `.env.example` isminde bir ortam dosyası örneği bulunur. Bu dosyayı `.env` olarak kopyalayıp içeriğindeki değişkenlerin uygun şekilde güncellenmesi gerekmektedir. Laravel ve Socket.io bilgisi olan kişiler bu güncellemeleri kolayca yapabilir. Bu teknolojiler hakkında bilgisi olmayan kişiler bu teknolojileri öğrenmeli veya bilen birisinden destek almalıdır.


### Genel bilgiler:

ISPConfig tabanlı sunucularda ssh'a ilk girildiğinde home klasörü açılır. Örnek home klasörü: `/var/www/clients/client0/web8/home/defaultadoptezapi`. Fakat burası web klasörü değildir. Web klasörüne geçmek için `cd ../../web` komutunu kullanmanız gerekiyor. Tüm işlemleri web klasörü altında yapmanız gerekiyor.

Ayrıca proje kodları güncellendiğinde bu değişikliğin sunucuda da etkili olması için ssh ile girdikten sonra web klasörüne girin. Ardından aşağıdaki yönergelere göre `Adoptez1Artisan` klasörüne girip `git pull origin master` diyerek projenin son halini githubdan çekin.



### Api projesinin kurulumu:

SSH ile api projesine barındığı hosting hesabına bağlandıktan sonra projeyi github üzerinden çekmemiz gerekiyor.

`git clone https://github.com/mehmetcanseyhan/Adoptez1Artisan.git`

Sonra ilgili projenin klasörüne girip gerekli komutları çalıştırmamız gerkeiyor.

```
cd Adoptez1Artisan/adoptez-backend

composer install

cp .env.example .env

nano .env
```


<a href="./json/example_env.txt">Örnek .env dosyası</a>

Buradaki db, stripe key, google maps api key, mail bilgileri, ve APP_KEY değerlerininin güncellenmesi gereklidir.


Tüm işlemleri doğru şekilde yaptıktan sonra artık veritabanı kurulumuna geçebiliriz. Bunun için laravel tarafında migration ve seed komutlarını çalıştırmamız gerekiyor.

```
php artisan migrate
php artisan db:seed
```

Bu komutlar birkaç dakika sürebilir. Sonrasında veritabanımız hazır hale gelecektir. Proje hazır hale geldikten sonra `PROJE_KLASORU/public` klasörünün `public_html` klasörüne linklenmesi gerekmektedir.



### Socket.io projesinin kurulumu:

Socket.io projesi API projesinin içerisindeki `WebsocketServer` klasörünün altında bulunmaktadır. Buradaki `.env.example` dosyasını `.env` olarak kopyalayıp buradaki değişkenleri uygun şekilde güncellenmesi gerekiyor. Ardından `npm install` diyerek bağımlılıkların kurulması ve ardından `npm run forever-live` komutuyla proje çalıştırılmalı. Projenin sürekli açık kalması için `forever` paketinin sisteme kurulmuş olması gerekmektedir.


Proje çalıştıktan sonra websocket için reverse proxy ayarlarının yapılması gerekiyor. Apache için gerekli direktifler şu şekildedir:

```
ProxyPass / http://127.0.0.1:35000/

RewriteEngine on
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule ^/?(.*) "ws://127.0.0.1:35000/$1" [P,L]

ProxyTimeout 3
```



### Frontend projesinin kurulumu:

Frontend projesi de aynı API projesinin kurulumu gibidir. `composer` ile bağımlılıkların kurulumu, `.env` dosyası ayarlamaları ve `public` klasörünün linklenmesi işlemlerinden sonra proje hazır hale gelecektir.


### Admin panel kurulumu:


SSH ile admin panel projesine barındığı hosting hesabına bağlandıktan sonra projeyi github üzerinden çekmemiz gerekiyor.

`git clone https://github.com/mehmetcanseyhan/Adoptez1Artisan.git`


Sonra ilgili projenin klasörüne girip gerekli komutları çalıştırmamız gerkeiyor. Bu projede `yarn` kullanmamız gerekiyor.

```
cd Adoptez1Artisan/adoptez-admin-frontend

yarn

cp .env.example .env

nano .env
```

İlgili ortam değişkenleri güncellendikten sonra aşağıdaki komutu çalıştırarak projeyi derliyoruz.



```
yarn deploy
```


Bu komutun çalışması birkaç dakika sürmektedir. İşlem tamamlandıktan sonra `PROJE_KLASORU/build` klasörünün `public_html` klasörüne linklenmesi gerekiyor. Ardından admin panele giriş yapılabilir.

