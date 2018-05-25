**Installation** <br>
<code>
npm i --save loopback-encryption-mixin
</code>

In your model-config.json: add "../node_modules/loopback-encryption-mixin" as a mixin

```json
{
    "...": "...",
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins",
      "../node_modules/loopback-encryption-mixin"
    ],
    "....": "..."
}
  ```

Then add the mixin to your model

```json
{
"...": "...",
"mixins": {
    "Encryption": {
      "fields": ["name"],
      "password": "mypassword",
      "salt": "jkncjahksdjahsdkjhasjdhasdhkjasna",
      "iteration": 100,
      "hashBytes": 16,
      "hashAlgorithm": "sha1",
      "hexIv": "cd5c632d26fde5e2eb61e521ad2b91ba",
      "encryptionAlgorithm": "aes-128-cbc"
    }
  },
 "properties": {
    "...": "..."
  },
 "....": "..."
 }
  ```

*Options Explained*

| Options        | Description           |
| ------------- |:-------------|
| fields      | the properties of the model that need to be encrypted |
| password      | the password of the encryption      |
| salt | salt for hashing the password      |
|iteration| iteration of the hash|
|hashBytes| the hash bytes corresponding to your hash algorithm and encryption algorithm|
|hashAlgorithm| Hash algorithm|
|hexIv| iv used for encryption in HEX format|
|encryptionAlgorithm| Encryption Algorithm corresponding to your iv and password format|