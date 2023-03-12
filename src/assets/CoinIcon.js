export const CoinIcon = ({ size = 20, color = "#fff", style = {} }) => {
    return (
        <svg
            style={style}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill={color}
            version="1"
            viewBox="0 0 1500 1500"
        >
            <path
                d="M2717 14018c-109-184-231-394-252-433-12-22-40-69-62-105s-51-85-65-110c-44-79-133-233-176-304-23-37-42-70-42-73 0-2-26-48-58-101-33-53-87-146-122-207-35-60-87-149-117-197-29-48-53-90-53-93 0-2-25-45-55-95s-55-92-55-95c0-2-22-40-50-85-27-45-50-84-50-87 0-2-26-48-58-101-33-53-87-146-122-207-35-60-87-150-117-198-29-49-53-91-53-94s-25-45-55-95c-30-49-55-91-55-93 0-1-37-65-82-141-44-77-95-163-112-193-17-29-41-71-53-92-13-22-33-57-45-78-36-61-161-277-216-371-134-229-227-389-250-430-14-25-41-69-59-99-19-30-38-61-41-70-4-9-26-47-48-86-23-38-74-125-113-192l-71-122 27-48c14-26 62-108 105-181s78-134 78-136c0-4 183-320 200-346 5-8 19-33 31-55 22-41 142-248 159-275 6-8 23-40 40-70s40-71 51-90c12-19 51-87 87-150s73-127 83-142c11-15 19-29 19-32 0-2 20-38 45-80 36-61 263-455 335-581 10-16 59-102 110-190s161-279 245-425 173-300 199-343c25-43 46-81 46-83 0-3 8-17 19-32 10-15 47-79 83-142s76-133 89-155c61-106 85-148 94-163 6-9 48-84 95-165 110-192 108-188 203-352 222-385 228-395 250-396 30-2 1373-7 3117-13 800-2 1460-5 1466-5 7-1 58-81 114-178 57-98 113-195 126-215 13-21 24-40 24-42s43-77 95-165c52-89 95-163 95-165s59-103 130-225 130-223 130-225 50-88 110-191c61-103 110-188 110-190 0-1 36-63 79-138 43-74 90-154 103-178 14-24 58-100 98-169s97-168 127-220 63-108 73-125c9-16 61-106 115-200 54-93 153-264 220-380 67-115 168-291 225-390s127-219 154-267c28-47 59-100 68-117l17-31 2243 6c3001 8 3033 8 3032 17-1 5-114 200-252 435-137 235-259 443-270 462s-57 98-103 175c-45 77-105 180-132 228l-50 88-646-5c-355-4-954-8-1331-11s-906-7-1177-10c-371-3-494-1-501 8-10 12-221 391-305 547-36 67-73 134-147 265-13 22-154 279-315 570-161 292-303 548-315 570-35 62-272 491-320 580-50 92-66 121-125 225-23 41-56 100-72 130-17 30-39 71-50 90s-37 67-57 105c-21 39-42 74-47 79-18 19-8 47 44 129 29 45 56 89 60 97s24 41 45 72c20 32 79 126 131 210 99 162 199 323 241 389 14 21 94 150 178 287 84 136 202 326 263 422 60 96 136 220 170 275s76 123 94 150c18 28 99 158 180 290s191 310 245 395c53 85 123 198 155 250s75 122 95 155l37 60h1801c1756 0 1800 0 1821 19 12 11 21 22 21 26 0 9 56 102 88 147 12 17 22 34 22 38 0 3 20 36 43 73 24 37 81 128 127 202 78 127 378 611 496 800 29 47 56 93 59 103 7 16-29 17-611 18-341 0-2373 2-4516 5-3293 3-3898 2-3898-10s79-154 270-486c108-187 402-704 435-765 44-81 98-170 106-175 4-3 460-5 1013-4 775 1 1006-2 1006-11 0-7-11-27-24-46-14-19-35-52-49-74-13-22-60-98-104-170-44-71-173-283-288-470-114-187-234-383-266-435s-67-108-79-125c-21-30-74-117-112-185-11-19-26-42-32-50-11-13-63-98-76-125-3-5-17-28-31-50-23-35-148-237-328-532-31-50-72-118-93-150l-36-60-749-1c-2238-3-2954-2-2962 3-5 3-71 114-147 248-75 133-172 303-214 377s-92 162-110 195-53 93-77 133c-24 41-43 75-43 77s-34 62-75 135c-81 141-243 427-283 500-14 25-28 50-32 55-4 6-21 35-37 65s-69 125-118 210c-48 85-96 169-105 185-143 254-247 436-261 460-10 17-23 40-28 52-6 12-21 39-34 60s-39 65-57 98c-62 113-77 140-158 282l-80 142 50 83c28 46 65 108 83 138 17 30 141 237 275 460 133 223 250 419 260 435 9 17 166 279 348 583 183 304 332 556 332 558 0 3 5 10 10 17 10 12 230 378 230 383 0 1 50 85 112 186 61 100 118 197 127 213 23 47 83 139 95 147 6 5 227 6 491 3 1029-11 1335-14 2025-20 393-4 828-8 966-9 283-4 249-12 299 79 12 22 62 110 112 195 49 85 116 200 148 255s82 143 113 195c47 82 133 230 170 295 6 11 32 56 57 99 26 43 55 93 64 110 10 17 43 75 74 129 32 54 57 102 57 107 0 6-87 10-222 11-123 0-464 2-758 4-999 7-2272 15-3357 21l-1081 6-55-94z"
                transform="matrix(.1 0 0 -.1 0 1500)"
            ></path>
        </svg>
    )
}