"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 1337,
    host: 'localhost',
    dbUri: 'mongodb://localhost:27017/rest-api-tutorial',
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    smtp: {
        user: 'selena.west@ethereal.email',
        pass: 'MEZUaSwXBWdj6dxyKd',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    },
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6MW8v1VxwFaJO+1nTVj
yEopxFD7juyq7f7n78gBBT/bcifL2UWoi+kZ6YnADwB3r1qs4YYDrP+fDxwpcMOS
tRrv3YOfFurnSjgr8X61bMlupOHXj07fAogDHgmtxj+HDlq7NNi/SDyY76fOEjOU
n+gSqnrTMFgrvpvMIHKJj8VSbV7yWwRN7p74geBZ6LrRvRTjhnbvF8W/5JeTpRkv
9K4Ukp8LoAeRyf0py7/CuCLH8C07rgey1Ruc0pfFSIDaBZjsbXIA2Pm8ELHcq/Aq
xN6wIklWo1tAQhO1oHiDNusaLIOYOiLBVBZQh33HP7MsrmHMm3ARRgdbh1DCoMZS
CwIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAq6MW8v1VxwFaJO+1nTVjyEopxFD7juyq7f7n78gBBT/bcifL
2UWoi+kZ6YnADwB3r1qs4YYDrP+fDxwpcMOStRrv3YOfFurnSjgr8X61bMlupOHX
j07fAogDHgmtxj+HDlq7NNi/SDyY76fOEjOUn+gSqnrTMFgrvpvMIHKJj8VSbV7y
WwRN7p74geBZ6LrRvRTjhnbvF8W/5JeTpRkv9K4Ukp8LoAeRyf0py7/CuCLH8C07
rgey1Ruc0pfFSIDaBZjsbXIA2Pm8ELHcq/AqxN6wIklWo1tAQhO1oHiDNusaLIOY
OiLBVBZQh33HP7MsrmHMm3ARRgdbh1DCoMZSCwIDAQABAoIBAH6sLxPGxLfK16zK
/U65SJtZoNmyqvYg1UYxCxx8j8RADMWDeX8xWeNodidV8tkfjzVrxovrTGsxfUK5
lhwTOwNOjhj+Ozu+wlSUgFoLGfrf7zjhNSYfH5fOqf5RRl86I4MEk4W9Me8uSfEV
95CXYOljbeNEIvlbGW3jrhOEdOIVmfL/dOxy7bCSTs753UuyEYPdamnb7MSNlueP
q2jx3xGFaGSstsUEFuFWBxnpgcv3GwOvLTYCWKoXgDD0cLEWtQ5UqVhIX4o9diCT
+IV5mtuZdgrvNkXfMKyKsA+f+0IfRHBkRt9rTkgkVTZdMNaUu99iyC7tjDwjg+yn
/N+8UYECgYEA1mXxe5DvM2PoH0fBGbYNGfyIMH85a3IMI/M3k34fqHksCI4PEu8V
+zDgrzOJCYKZyUt25nwdNavS/agG8Qz0DjyhbuuoWgcx9uyDphdsDOLW+f7V4Qy3
1tFNsF8s2yxv3G0QlTne338PYWkLjYRLSU7R80jDZXiNRgRCuJBmBP0CgYEAzPEF
bhauEvyHmR1ImKnVHFNQExsxMzHoNZ4C1RZObMn8iEfb9Qpltj3A5AbO1rwivnr+
ZOs1BJcIi9BEmsmcWGsrh8UaOr+sf/b9jm6mqoQCB2l0+i1DLRVW2SotMn0A1oUO
SK0ttQQY/FuTTIMPuBPyNjZcE9P/txaYneGqpacCgYBpmDAFYe7N6sjqjxamKSnu
wJf6+s43AybDlgirVhUVjwiG9iCqfKLg4sPmxoUZ7/76S3a2Mi7YvlXepKE2m+Cg
GnCQBvUV0jFjoj180lBfUGH9IuwIOZFZ9iBDW7zl/c7iS709IhGJFjVnDqun+Z5y
7qUtI4tJMMSz1WlfKY91qQKBgC5EzAEKxcorkUGURuuQjDiU5qMppHX2coKIZgNN
we71uznZX2N3MXdvgbj5gIEigIWYpw6Ju7KJlrhaEOMRWWbs6yr/6OgSlhNd4+jg
OmiM3RhnSq2gwmXPR4hH6WRYrHPCHnNyBbu0bR+sXRkNDeN1PV3X7/naBwWC6Hnc
lPZJAoGBAIr0nF8elpn/Sb5zlO8DIXl2KKCaAMI6jfZDml/f3Ua/MRAypjBHJhpm
PVmLeBkpA5sjg7Dhh5h9la5FaLJ5MIIGtAtEXxQmwxyRtY2ZE32zLNRGCBDEdJpQ
0XWxvYKRW0/kYUZoBHJvu5ZpFZs/10h6WoUgOG9wwhiO1D5QwJWa
-----END RSA PRIVATE KEY-----`
};
