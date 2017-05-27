using System;
using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Text;
using System.IO;

namespace MyStudyClass
{
    /// <summary>
    ///JsonHelper 的摘要说明
    /// </summary>
    public class JsonHelper
    {
        public JsonHelper()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }

        /// <summary>
        /// Datatable转JSon
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="dtName"></param>
        /// <returns></returns>
        public static string DataTableToJSON(DataTable dt, string dtName)
        {
            StringBuilder sb = new StringBuilder();
            StringWriter sw = new StringWriter(sb);

            using (JsonWriter jw = new JsonTextWriter(sw))
            {
                JsonSerializer ser = new JsonSerializer();
                jw.WriteStartObject();
                jw.WritePropertyName(dtName);
                jw.WriteStartArray();
                foreach (DataRow dr in dt.Rows)
                {
                    jw.WriteStartObject();

                    foreach (DataColumn dc in dt.Columns)
                    {
                        jw.WritePropertyName(dc.ColumnName);
                        ser.Serialize(jw, dr[dc].ToString());
                    }

                    jw.WriteEndObject();
                }
                jw.WriteEndArray();
                jw.WriteEndObject();

                sw.Close();
                jw.Close();

            }

            return sb.ToString();
        }

        public static string StringToJSON(string str, string strName)
        {
            StringBuilder sb = new StringBuilder();
            StringWriter sw = new StringWriter(sb);

            using (JsonWriter jw = new JsonTextWriter(sw))
            {
                JsonSerializer ser = new JsonSerializer();
                jw.WriteStartObject();
                jw.WritePropertyName(strName);
                ser.Serialize(jw, str);
                jw.WriteEndObject();
                
                sw.Close();
                jw.Close();

            }

            return sb.ToString();
        }

        /// <summary>
        /// JSON序列化
        /// </summary>
        public static string JsonSerializer<T>(T t)
        {
            String JsonStr = JsonConvert.SerializeObject(t);
            return JsonStr;

            //JsonSerializer ser = new JsonSerializer();

            //DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            //MemoryStream ms = new MemoryStream();
            //ser.WriteObject(ms, t);
            //string jsonString = Encoding.UTF8.GetString(ms.ToArray());
            //ms.Close();
            //return jsonString;
        }

        /// <summary>
        /// JSON反序列化
        /// </summary>
        public static T JsonDeserialize<T>(string jsonString)
        {
            //DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            //MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            //T obj = (T)ser.ReadObject(ms);
            //return obj;

            T obj = (T)JsonConvert.DeserializeObject<T>(jsonString);
            return obj;
        }

 
    }
}