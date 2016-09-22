package doughoskisson.cs5551.lab4;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    final static String apiurl = "http";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        //setSupportActionBar(toolbar);

        /*
        FloatingActionButton button = (FloatingActionButton) findViewById(R.id.button);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        */
    }

    public void buttonAction(View v) {
        String alchemyUrl = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8&outputMode=json&url=";
        final TextView outputTextView = (TextView) findViewById(R.id.outputText);
        final TextView inputTextView = (TextView) findViewById(R.id.inputText);
        String inputText = inputTextView.getText().toString();
        if (! inputText.startsWith("http://")) {
            inputText = "http://" + inputText;
        }
        alchemyUrl += encodeURIComponent(inputText);

        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(alchemyUrl)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResponse;
                    final String responseString = response.body().string();
                    String topics = "nothing";
                    try {
                        jsonResponse = new JSONObject(responseString);
                        JSONArray entitiesArray = jsonResponse.getJSONArray("entities");
                        if (entitiesArray.length() > 0) {
                            JSONObject firstEntity = new JSONObject(entitiesArray.get(0).toString());
                            topics = firstEntity.getString("text");
                        }
                        Log.d("okHttp", jsonResponse.toString());
                        final String finalTopics = topics;
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText("This page is about " + finalTopics + ".");
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });


        } catch (Exception ex) {
            outputTextView.setText(ex.getMessage());

        }
    }

    public static String encodeURIComponent(String originalStr) {
        String encodeString = null;
        try{
            encodeString = URLEncoder.encode(originalStr, "UTF-8")
                    .replaceAll("\\+", "%20")
                    .replaceAll("\\%21", "!")
                    .replaceAll("\\%27", "'")
                    .replaceAll("\\%28", "(")
                    .replaceAll("\\%29", ")")
                    .replaceAll("\\%7E", "~");

        }catch (UnsupportedEncodingException e)    {
            System.out.println("Exception while encoding");
        }

        return encodeString;
    }

}
