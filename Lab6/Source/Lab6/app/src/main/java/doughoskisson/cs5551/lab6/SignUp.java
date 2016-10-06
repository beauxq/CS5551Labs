package doughoskisson.cs5551.lab6;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.location.Address;
import android.location.Geocoder;
import android.location.LocationManager;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class SignUp extends AppCompatActivity {

    double latitude, longitude;
    int TAKE_PHOTO_CODE = 0;
    ImageButton cameraImageButton;
    Bitmap photo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        // handle image
        cameraImageButton = (ImageButton) findViewById(R.id.imageButton);
        cameraImageButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);
            }
        });

        // get address of current location
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.println(Log.INFO, "my_debugging", "no permission");
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }

        Geocoder geocoder = new Geocoder(this);
        StringBuilder userAddress;

        LocationManager userCurrentLocation = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);

        /* not needed
        LocationListener userCurrentLocationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {

            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };
        userCurrentLocation.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                0, 0, userCurrentLocationListener);
        */

        latitude = userCurrentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER).getLatitude();
        longitude = userCurrentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER).getLongitude();

        try {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            Address address = addresses.get(0);
            userAddress =  new StringBuilder();
            for (int i = 0; i < address.getMaxAddressLineIndex(); ++i) {
                userAddress.append(address.getAddressLine(i));
                if (i != address.getMaxAddressLineIndex() - 1)  // don't put comma after last line
                    userAddress.append(", ");
                Log.println(Log.INFO, "my_debugging", "now: " + userAddress.toString());
            }
            Log.println(Log.INFO, "my_debugging", "final: " + userAddress.toString());

            // set address in UI
            EditText addressEditText = (EditText)findViewById(R.id.addressEditText);
            addressEditText.setText(userAddress.toString(), TextView.BufferType.EDITABLE);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK) {
            photo = (Bitmap) data.getExtras().get("data");

            // rotate
            Matrix matrix = new Matrix();

            matrix.postRotate(90);

            Bitmap scaledBitmap = Bitmap.createScaledBitmap(photo, 400, 300, true);

            Bitmap rotatedBitmap = Bitmap.createBitmap(scaledBitmap , 0, 0, scaledBitmap.getWidth(), scaledBitmap.getHeight(), matrix, true);

            Log.i("my_debugging", "size of photo: " + SignUp.size_of_bitmap(photo).toString());
            Log.i("my_debugging", "size of rotatedBitmap: " + SignUp.size_of_bitmap(rotatedBitmap).toString());

            // put photo on screen
            cameraImageButton.setImageBitmap(rotatedBitmap);
        }
    }

    public void proceedButtonClick(View view) {
        Intent redirect = new Intent(SignUp.this, Home.class);
        redirect.putExtra("photo", photo);
        redirect.putExtra("lat", latitude);
        redirect.putExtra("long", longitude);
        startActivity(redirect);
    }

    // for testing
    static Integer size_of_bitmap(Bitmap bitmapOrg) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmapOrg.compress(Bitmap.CompressFormat.JPEG, 100, stream);
        byte[] imageInByte = stream.toByteArray();
        return imageInByte.length;
    }
}
