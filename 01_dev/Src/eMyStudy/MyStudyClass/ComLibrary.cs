using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using System.Data;

namespace MyStudyClass
{
    class ComLibrary
    {
        public ComLibrary()
        {
            //throw new System.NotImplementedException();
        }

        #region 按指定条件生成随机数
        /// <summary>
        /// 在指定区间数值中取出指定个数且互不相同的随机数
        /// </summary>
        /// <param name="num">需生成随机数个数</param>
        /// <param name="minValue">随机数区间最小值</param>
        /// <param name="maxValue">随机数区间最大值</param>
        /// <returns></returns>
        public static int[] getRandomNum(int num, int minValue, int maxValue)
        {
            Random ra = new Random(unchecked((int)DateTime.Now.Ticks));
            int[] arrNum = new int[num];
            int tmp = 0;
            for (int i = 0; i <= num - 1; i++)
            {
                tmp = ra.Next(minValue, maxValue); //随机取数
                arrNum[i] = getNum(arrNum, tmp, minValue, maxValue, ra); //取出值赋到数组中
            }
            return arrNum;
        }
        /// <summary>
        /// 检测生成的随机数是否有重复，
        /// 如果取出来的数字和已取得的数字有重复就重新随机获取
        /// </summary>
        /// <param name="arrNum"></param>
        /// <param name="tmp"></param>
        /// <param name="minValue"></param>
        /// <param name="maxValue"></param>
        /// <param name="ra"></param>
        /// <returns></returns>

        public static int getNum(int[] arrNum, int tmp, int minValue, int maxValue, Random ra)
        {
            int n = 0;
            while (n <= arrNum.Length - 1)
            {
                if (arrNum[n] == tmp) //利用循环判断是否有重复
                {
                    tmp = ra.Next(minValue, maxValue); //重新随机获取。
                    getNum(arrNum, tmp, minValue, maxValue, ra);//递归:如果取出来的数字和已取得的数字有重复就重新随机获取。
                }
                n++;
            }
            return tmp;
        }
        #endregion

        #region : 删除DataTable指定列之重复值，类似distinct
        /// <summary>   
        /// 删除DataTable指定列之重复值，类似distinct   
        /// </summary>   
        /// <param name="dt">DataTable</param>   
        /// <param name="Field">字段名</param>   
        /// <returns></returns>   
        public static DataTable DeleteSameRow(DataTable dt, string Field)
        {
            ArrayList indexList = new ArrayList();
            // 找出待删除的行索引   
            for (int i = 0; i < dt.Rows.Count - 1; i++)
            {
                if (!IsContain(indexList, i))
                {
                    for (int j = i + 1; j < dt.Rows.Count; j++)
                    {
                        if (dt.Rows[i][Field].ToString() == dt.Rows[j][Field].ToString())
                        {
                            indexList.Add(j);
                        }
                    }
                }
            }
            indexList.Sort();
            // 根据待删除索引列表删除行   
            for (int i = indexList.Count - 1; i >= 0; i--)
            {
                int index = Convert.ToInt32(indexList[i]);
                dt.Rows.RemoveAt(index);
            }
            return dt;
        }

        /// <summary>   
        /// 判断数组中是否存在   
        /// </summary>   
        /// <param name="indexList">数组</param>   
        /// <param name="index">索引</param>   
        /// <returns></returns>   
        public static bool IsContain(ArrayList indexList, int index)
        {
            for (int i = 0; i < indexList.Count; i++)
            {
                int tempIndex = Convert.ToInt32(indexList[i]);
                if (tempIndex == index)
                {
                    return true;
                }
            }
            return false;
        }
        #endregion

    }
}
