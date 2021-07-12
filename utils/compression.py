import zipfile


def compress():
    zip = zipfile.ZipFile('data/covid19cuba.zip', 'w')
    zip.write('data/covid19-cuba.json', compress_type=zipfile.ZIP_DEFLATED)
    zip.write('data/covid19-fallecidos.json', compress_type=zipfile.ZIP_DEFLATED)
    zip.write('data/covid19-casos.csv', compress_type=zipfile.ZIP_DEFLATED)
    zip.write('data/covid19-cuba-1.json', compress_type=zipfile.ZIP_DEFLATED)

    zip.close()
