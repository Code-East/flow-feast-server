const AlipaySdk = require('alipay-sdk').default;
const alipaySdk = new AlipaySdk({
    appId:'2021000121666161', // 应用id
    gateway:'https://openapi.alipaydev.com/gateway.do', // 支付宝网关
    signType: 'RSA2', // 编码格式
    alipayPublicKey:`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCg
                    KCAQEAgciPYzQ9ru+JZM522vOzHz/ZT0aOLaQWIwFR7D9w+Qo+KS7obd
                    aM65OlKWxZ8v1PQo03Fc4B25oHoIj/C1n77LK2kSld9IaDJmIPYNjdLA
                    56Piti1MrZVCV0cDIwrGxgFCmTGKkNg0hJW/1eRhZWJkx8QsH0PJ9xqUI
                    HoI7DLI/rFz4t69SQjl8Nq0lnSfVeTsjXgqeRkhefK8ngy+vhtPCOXv6F
                    YpF2kkShWp6YkZLCBfqPcUqoGY7h66tydGG3DJEjB0rTDZOLN6Lfj9pwae
                    Pr/6Cjr2TMKJe6iYqHJIDGeUv3NEGKgs78GV8TMCK7QVM7CYmEgxQiPloj
                    rNCFMQIDAQAB`, //支付宝公钥
    privateKey:`MIIEowIBAAKCAQEArhc9oqABQwzR6bzksYET9qkQR4/GjHV/+ROTpDUCfCNi3V5
                y3c+b5cjWbpRV7MMXsp0dMdhZNYSe+AtQI5TEzi9GjBWmKEQRsdKlAT5s0+4wB6aaa9UwOheTrh
                FzeWMjn1Nt3x8oZnmBsh3iC86NZRrI02nKUFXhj+PJhlw0CbWLLWfr8eY8HSs3ByP9A4Qm0W3667
                kpdXYFjesr1SZJnt1SDAlDPMReZ4YK6apbcT4MioPXwd8v+H4OiYv5o/0nLPRywBB+GHHvHx9NSUT
                93eqKhCRwHy40iQo240SkIoiQNBPunUlqi2YvSiwVqJ65nRHOU7zkDEwhvlYdFqJK/wIDAQABAoIB
                AC+JKwxH0nBjhMHlETEixLe6bDaOHLHnt5zkapEQ5G/PHcTCcGz+rlvtHhgtqtSuZL8hxYIByEIjx2
                CFfklo6uA96m5/ztH53DcJBIM1b3Pi+vxr0oiVOsjx/SIvo69GkciEeGDPWjG5BeAD5uBAcz1jNej8
                XwDWonOuyC1G6fKoSwbFrn1AeH6Bmw77Q1lhN7AM4ZpOMuN/AYFxPmklZ8nHZO+dPIwvL68OLaSH2x
                pZMZfPHHJ01CYteEy8qYTleoIH4NlOv/Js2MTbLuRUn6T2C0ggJ9EdM/Mi9DA7E70WCrG5LLxn60I+I
                dFZw2mPBP8CxOmhNdftoTcIepKMoCECgYEA5FErkQqlPTqH9WvmkknhRuKDvu64UlA1SYat6ss2mgngl
                3zmm03ziKNADFVLs27If+2O8yYxko+uiXazmTW3VCBiLpfVBT4EhkebQLFVxvQzmnvC7r2BvkWUzVM4Ol
                LTKIdfniDPYHpIP4PcxLPa/mfhJXLqnbFGllPSC0J0cxECgYEAwzLrAmF7bHPpD1PvkzN0iabkX7xJif/
                YVOgVyWxrTVegqVlqRJLvKjlTC6i74JXq9O4Wm5kguVWA3+0M2KIhfxxGASHmkHSAnokJHB9COw2gVMkAI
                KSJwWgGe0U9hm9G9+S6LFPW2FLf4LQwxuqD+i5P+dQLbvtPWHMlh3McvQ8CgYEAiWzOE1xb/1G2uiM7QnxT
                q432DLu1mF4M5Pe6wSOV9vvRAn28dGhkGK9igsnoadVZu56qt3IazoPLY5ReH+70LR/c2PyszJ36rTR2n2b
                eIYWldevedkL80CEjor7fjkOCM9ff1tca25Be4lQlUwSK4Sx3mUnlLAujWCKVwA889nECgYAPhtRUuyZTKS
                Enu/h5kAU8Ec9mohaDaJtvnYpmHD6ox0ibT+Z5D+sAQ9EMQ162bZZj5zBbLiIBPADlTvjPno3li30yB91MLk
                gw1BuqZf4hrmLLe7WL4yql/L1PPuG2+ND/VO1OK1kSmfz+5bZfjDX1R4vLBofmSw0zru0USh7GFwKBgFlBn
                HpfmSrkwlJIJk+hQNmO+0Y7kCuPMl0VkJXudeVg4akptLYTNL6VD0xgYFElHNVsdJG+j6mfAUjoY01TW9o+j
                /EfHRDRj6+Uo+tiTZ5b1Ysfx3/2yFt7GmON1gus2HxO1CFYgAnF1EO/r7AoILV199+s0QJDsvvIn4DKMv1e` //应用私钥
})

module.exports = {
    alipaySdk
}