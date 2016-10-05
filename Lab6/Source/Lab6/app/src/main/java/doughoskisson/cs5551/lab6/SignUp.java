package doughoskisson.cs5551.lab6;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.util.Log;
import android.widget.EditText;
import android.widget.TextView;

import java.util.List;

public class SignUp extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

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
        double latitude, longitude;
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
            // userAddress.append(address.getCountryName()).append("\t");
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

    public void proceedButtonClick(View view) {
        Intent redirect = new Intent(SignUp.this, MapsActivity.class);
        startActivity(redirect);
    }

    public void imageButtonClick(View view) {
        Intent redirect = new Intent(SignUp.this, ImageActivity.class);
        startActivity(redirect);
    }
}
