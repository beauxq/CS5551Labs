package doughoskisson.cs5551.lab6;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class SignUp extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
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
